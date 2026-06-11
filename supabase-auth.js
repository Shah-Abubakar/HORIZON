// Horizon — Supabase Authentication Module

(function() {
    'use strict';

    // ============================================================
    // SUPABASE CONFIGURATION
    // ============================================================
    const SUPABASE_URL = 'https://jyrczdypdrackzcywxjb.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbG...Ac9c';  // ← REPLACE WITH YOUR FULL ANON KEY
    
    let supabaseClient = null;
    let currentUser = null;
    let pendingUser = null;
    let onboardingData = { name: '', skill: '', goal: '', stage: '' };
    
    // ============================================================
    // INITIALIZE SUPABASE
    // ============================================================
    function initSupabase() {
        if (typeof supabaseJs === 'undefined') {
            console.error('[Supabase] SDK not loaded! Check network or ad blockers.');
            document.addEventListener('DOMContentLoaded', function() {
                var body = document.body;
                if (body) {
                    body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;padding:20px;text-align:center;background:#0a0a0a;color:#fff;font-family:sans-serif;"><div style="font-size:40px;margin-bottom:16px;">⚠️</div><div style="font-size:18px;font-weight:700;margin-bottom:8px;">Connection Error</div><div style="font-size:14px;color:#888;max-width:300px;line-height:1.5;">Unable to load Supabase. Please check your internet connection and disable any ad blockers, then <button onclick="location.reload()" style="background:linear-gradient(135deg,#8AE3FF,#FFB86B);border:none;padding:8px 20px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;color:#000;margin-top:16px;">Reload</button></div></div>';
                }
            });
            return;
        }
        
        supabaseClient = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('[Supabase] Initialized');

        // Verify Supabase connection
        supabaseClient.from('startups').select('id').limit(1).then(function({ error }) {
            var dot = document.getElementById('firestoreDot');
            var txt = document.getElementById('firestoreText');
            if (dot && txt) {
                if (error && error.code === '42P01') {
                    dot.style.background = '#FFB86B';
                    txt.textContent = 'Need tables';
                } else if (error) {
                    dot.style.background = '#ff6b6b';
                    txt.textContent = 'Error: ' + (error.code || 'unknown');
                } else {
                    dot.style.background = '#34A853';
                    txt.textContent = 'Connected';
                }
            }
        });

        supabaseClient.auth.onAuthStateChange(async function(event, session) {
            if (session && session.user) {
                currentUser = session.user;
                await handleUserSignIn(session.user);
            } else {
                currentUser = null;
                showLoginScreen();
            }
        });

        checkExistingSession();
    }

    async function checkExistingSession() {
        try {
            var result = await supabaseClient.auth.getSession();
            var session = result.data ? result.data.session : null;
            if (session && session.user) {
                currentUser = session.user;
                await handleUserSignIn(session.user);
            } else {
                showLoginScreen();
            }
        } catch(e) {
            console.error('[Supabase] Session check error:', e);
            showLoginScreen();
        }
    }
    
    async function handleUserSignIn(user) {
        try {
            var result = await supabaseClient
                .from('users')
                .select('*')
                .eq('auth_id', user.id)
                .maybeSingle();
            
            var existingUser = result.data;

            if (result.error && result.error.code !== 'PGRST116') {
                console.error('[Supabase] Error fetching user:', result.error);
            }
            
            if (!existingUser) {
                // New user — create profile in Supabase
                var insertResult = await supabaseClient.from('users').insert({
                    auth_id: user.id,
                    email: user.email,
                    display_name: (user.user_metadata && user.user_metadata.full_name) || '',
                    onboarded: false
                });
                
                if (insertResult.error) {
                    console.error('[Supabase] Error creating user:', insertResult.error);
                }
                startOnboarding(user);
            } else if (!existingUser.onboarded) {
                startOnboarding(user);
            } else {
                // Returning user — dispatch event and show app
                var event = new CustomEvent('horizon:userReady', {
                    detail: {
                        uid: user.id,
                        displayName: existingUser.display_name,
                        email: user.email,
                        lookingFor: existingUser.looking_for || '',
                        startupStage: existingUser.startup_stage || '',
                        skills: existingUser.skills || []
                    }
                });
                document.dispatchEvent(event);
                showAuthenticatedContent();
            }
        } catch(e) {
            console.error('[Supabase] handleUserSignIn error:', e);
            startOnboarding(user);
        }
    }
    
    // ============================================================
    // GOOGLE SIGN-IN
    // ============================================================
    function handleGoogleSignIn() {
        var btn = document.getElementById('googleSignInBtn');
        var origHTML = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = '<span style="display:flex;align-items:center;gap:10px;">' +
                '<span style="width:18px;height:18px;border:2px solid #8AE3FF;border-top-color:transparent;border-radius:50%;animation:spin .8s linear infinite;display:inline-block;"></span>' +
                'Signing in...</span>';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';
        }

        supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
                queryParams: { prompt: 'select_account' }
            }
        }).then(function(result) {
            if (result.error) {
                throw result.error;
            }
        }).catch(function(error) {
            console.error('[Supabase] Sign-in error:', error);
            if (btn) {
                btn.innerHTML = origHTML;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }
            if (error.code === 'auth/unauthorized-domain') {
                showToast('Domain not whitelisted in Supabase!', '#ff6b6b');
            } else if (error.message) {
                showToast('Sign-in failed: ' + error.message, '#ff6b6b');
            } else {
                showToast('Sign-in failed. Please try again.', '#ff6b6b');
            }
        });
    }
    
    // ============================================================
    // SIGN OUT
    // ============================================================
    async function handleSignOut() {
        // Stop any realtime listeners
        if (window.HorizonStartups && window.HorizonStartups.unsubscribe) {
            window.HorizonStartups.unsubscribe();
        }

        if (document.getElementById('googleSignInBtn')) {
            document.getElementById('googleSignInBtn').innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Continue with Google';
            document.getElementById('googleSignInBtn').style.opacity = '1';
            document.getElementById('googleSignInBtn').style.pointerEvents = 'auto';
        }

        try {
            await supabaseClient.auth.signOut();
        } catch(e) {
            console.error('[Supabase] Sign out error:', e);
        }
        currentUser = null;
        showLoginScreen();
        showToast('Signed out', '#34A853');
    }
    
    // ============================================================
    // ONBOARDING
    // ============================================================
    function startOnboarding(user) {
        pendingUser = user;
        onboardingData = { name: '', skill: '', goal: '', stage: '' };
        
        var loginScreen = document.getElementById('loginScreen');
        var authenticatedContent = document.getElementById('authenticatedContent');
        var onboardingOverlay = document.getElementById('onboardingOverlay');
        
        if (loginScreen) loginScreen.classList.add('hidden');
        if (authenticatedContent) authenticatedContent.style.display = 'block';
        
        var nameInput = document.getElementById('onboardName');
        if (nameInput) {
            if (user.user_metadata && user.user_metadata.full_name) {
                nameInput.value = user.user_metadata.full_name;
                onboardingData.name = user.user_metadata.full_name;
                var nn = document.getElementById('onboardNameNext');
                if (nn) nn.disabled = false;
            } else {
                nameInput.value = '';
                var nn2 = document.getElementById('onboardNameNext');
                if (nn2) nn2.disabled = true;
            }
        }
        
        document.querySelectorAll('.onboarding-option').forEach(function(o) { o.classList.remove('selected'); });
        document.querySelectorAll('.onboarding-next').forEach(function(b) { b.disabled = true; });
        
        showOnboardingStep(0);
        if (onboardingOverlay) onboardingOverlay.classList.add('active');
    }
    
    function showOnboardingStep(n) {
        document.querySelectorAll('.onboarding-step').forEach(function(s) { s.classList.remove('active'); });
        document.querySelectorAll('.onboarding-dot').forEach(function(d, i) {
            d.classList.remove('active');
            if (i === n) d.classList.add('active');
        });
        var step = document.querySelector('.onboarding-step[data-step="' + n + '"]');
        if (step) step.classList.add('active');
    }
    
    async function finishOnboarding() {
        var onboardingOverlay = document.getElementById('onboardingOverlay');
        var user = pendingUser;
        if (!user) return;
        
        var finalName = onboardingData.name || (user.user_metadata && user.user_metadata.full_name) || 'Student';

        // Save profile data to Supabase
        try {
            await supabaseClient
                .from('users')
                .update({
                    display_name: finalName,
                    looking_for: onboardingData.goal,
                    startup_stage: onboardingData.stage,
                    skills: onboardingData.skill ? [onboardingData.skill] : [],
                    onboarded: true,
                    updated_at: new Date().toISOString()
                })
                .eq('auth_id', user.id);
        } catch(e) {
            console.error('[Supabase] Error saving onboarding:', e);
        }
        
        // Also save to localStorage for offline use
        try {
            localStorage.setItem('horizon_profile_' + user.uid, JSON.stringify({
                displayName: finalName,
                email: user.email,
                skill: onboardingData.skill,
                goal: onboardingData.goal,
                stage: onboardingData.stage,
                onboarded: true,
                createdAt: new Date().toISOString()
            }));
        } catch(e2) {}
        
        if (onboardingOverlay) onboardingOverlay.classList.remove('active');
        currentUser = user;
        
        var event = new CustomEvent('horizon:userReady', {
            detail: {
                uid: user.id,
                displayName: finalName,
                email: user.email,
                lookingFor: onboardingData.goal,
                startupStage: onboardingData.stage,
                skills: onboardingData.skill ? [onboardingData.skill] : []
            }
        });
        document.dispatchEvent(event);
        
        showToast('Welcome to Horizon, ' + finalName.split(' ')[0] + '!');
        pendingUser = null;
    }
    
    // ============================================================
    // UI HELPERS
    // ============================================================
    function showLoginScreen() {
        var loginScreen = document.getElementById('loginScreen');
        var authenticatedContent = document.getElementById('authenticatedContent');
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (authenticatedContent) authenticatedContent.style.display = 'none';
    }
    
    function showAuthenticatedContent() {
        var loginScreen = document.getElementById('loginScreen');
        var authenticatedContent = document.getElementById('authenticatedContent');
        if (loginScreen) loginScreen.classList.add('hidden');
        if (authenticatedContent) authenticatedContent.style.display = 'block';
    }
    
    function showToast(msg, color) {
        color = color || '#8AE3FF';
        var t = document.createElement('div');
        t.textContent = msg;
        t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:' + color + ';color:#000;padding:11px 18px;border-radius:28px;font-size:12px;font-weight:600;z-index:9999;pointer-events:none';
        document.body.appendChild(t);
        setTimeout(function() { t.remove(); }, 2500);
    }
    
    // ============================================================
    // SETUP ONBOARDING LISTENERS
    // ============================================================
    function setupOnboardingListeners() {
        var nameInput = document.getElementById('onboardName');
        var nameNext = document.getElementById('onboardNameNext');
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                onboardingData.name = nameInput.value.trim();
                if (nameNext) nameNext.disabled = onboardingData.name.length < 2;
            });
            nameInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.value.trim().length >= 2) showOnboardingStep(1);
            });
        }
        if (nameNext) {
            nameNext.addEventListener('click', function() {
                onboardingData.name = document.getElementById('onboardName').value.trim();
                showOnboardingStep(1);
            });
        }
        
        var skillOptions = document.getElementById('skillOptions');
        if (skillOptions) {
            skillOptions.querySelectorAll('.onboarding-option').forEach(function(opt) {
                opt.addEventListener('click', function() {
                    skillOptions.querySelectorAll('.onboarding-option').forEach(function(o) { o.classList.remove('selected'); });
                    this.classList.add('selected');
                    onboardingData.skill = this.getAttribute('data-value');
                    var next = document.getElementById('onboardSkillNext');
                    if (next) next.disabled = false;
                });
            });
        }
        
        var skillNext = document.getElementById('onboardSkillNext');
        if (skillNext) {
            skillNext.addEventListener('click', function() {
                if (onboardingData.skill) showOnboardingStep(2);
            });
        }
        
        var goalOptions = document.getElementById('goalOptions');
        if (goalOptions) {
            goalOptions.querySelectorAll('.onboarding-option').forEach(function(opt) {
                opt.addEventListener('click', function() {
                    goalOptions.querySelectorAll('.onboarding-option').forEach(function(o) { o.classList.remove('selected'); });
                    this.classList.add('selected');
                    onboardingData.goal = this.getAttribute('data-value');
                    var next = document.getElementById('onboardGoalNext');
                    if (next) next.disabled = false;
                });
            });
        }
        
        var goalNext = document.getElementById('onboardGoalNext');
        if (goalNext) {
            goalNext.addEventListener('click', function() {
                if (onboardingData.goal) showOnboardingStep(3);
            });
        }
        
        var stageOptions = document.getElementById('stageOptions');
        if (stageOptions) {
            stageOptions.querySelectorAll('.onboarding-option').forEach(function(opt) {
                opt.addEventListener('click', function() {
                    stageOptions.querySelectorAll('.onboarding-option').forEach(function(o) { o.classList.remove('selected'); });
                    this.classList.add('selected');
                    onboardingData.stage = this.getAttribute('data-value');
                    var next = document.getElementById('onboardStageNext');
                    if (next) next.disabled = false;
                });
            });
        }
        
        var stageNext = document.getElementById('onboardStageNext');
        if (stageNext) {
            stageNext.addEventListener('click', function() {
                if (onboardingData.stage) finishOnboarding();
            });
        }
        
        var b1 = document.getElementById('onboardBack1');
        var b2 = document.getElementById('onboardBack2');
        var b3 = document.getElementById('onboardBack3');
        if (b1) b1.addEventListener('click', function() { showOnboardingStep(0); });
        if (b2) b2.addEventListener('click', function() { showOnboardingStep(1); });
        if (b3) b3.addEventListener('click', function() { showOnboardingStep(2); });
        
        var s0 = document.getElementById('onboardSkip0');
        var s1 = document.getElementById('onboardSkip1');
        var s2 = document.getElementById('onboardSkip2');
        var s3 = document.getElementById('onboardSkip3');
        if (s0) s0.addEventListener('click', function() {
            onboardingData.name = document.getElementById('onboardName').value.trim();
            finishOnboarding();
        });
        if (s1) s1.addEventListener('click', finishOnboarding);
        if (s2) s2.addEventListener('click', finishOnboarding);
        if (s3) s3.addEventListener('click', finishOnboarding);
    }
    
    // ============================================================
    // INITIALIZE
    // ============================================================
    function init() {
        setupOnboardingListeners();
        initSupabase();
        
        var gBtn = document.getElementById('googleSignInBtn');
        if (gBtn) gBtn.addEventListener('click', handleGoogleSignIn);
        var lBtn = document.getElementById('logoutBtn');
        if (lBtn) lBtn.addEventListener('click', handleSignOut);
    }
    
    // ============================================================
    // PUBLIC API
    // ============================================================
    window.HorizonAuth = {
        init: init,
        getCurrentUser: function() { return currentUser; },
        setCurrentUser: function(u) { currentUser = u; },
        signInWithGoogle: handleGoogleSignIn,
        signOut: handleSignOut,
        showToast: showToast,
        supabase: function() { return supabaseClient; },
        loadProfile: function(uid) {
            try {
                return JSON.parse(localStorage.getItem('horizon_profile_' + uid) || '{}');
            } catch(e) { return {}; }
        },
        hasOnboarded: function(uid) {
            var p = this.loadProfile(uid);
            return p.onboarded === true;
        },
        startOnboarding: startOnboarding,
        finishOnboarding: finishOnboarding,
        saveToSupabase: async function(tableName, data, conflictColumn) {
            try {
                var result = await supabaseClient.from('users').upsert(data);
                if (result.error) throw result.error;
                return true;
            } catch(e) {
                console.error('[Supabase] saveToSupabase error:', e);
                return false;
            }
        },
        loadFromSupabase: async function(uid) {
            try {
                var result = await supabaseClient.from('users').select('*').eq('auth_id', uid).maybeSingle();
                return result.data;
            } catch(e) {
                console.error('[Supabase] loadFromSupabase error:', e);
                return null;
            }
        },
        getAllUsers: async function() {
            try {
                var result = await supabaseClient.from('users').select('*').eq('onboarded', true);
                return result.data || [];
            } catch(e) {
                console.error('[Supabase] getAllUsers error:', e);
                return [];
            }
        }
    };
    
})();

document.addEventListener('DOMContentLoaded', function() {
    if (window.HorizonAuth) window.HorizonAuth.init();
});