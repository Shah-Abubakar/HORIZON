// ============================================================
// HORIZON PROFILE MODULE
// ============================================================
(function() {
    'use strict';

    let profileAvatar, profileName, profileEmail, bioText, skillsList, lookingText, projectsList;
    let isEditMode = false;

    let currentUserData = {
        bio: '',
        skills: [],
        lookingFor: '',
        projects: []
    };

    function initProfile() {
        profileAvatar = document.getElementById('profileAvatar');
        profileName = document.getElementById('profileName');
        profileEmail = document.getElementById('profileEmail');
        bioText = document.getElementById('bioText');
        skillsList = document.getElementById('skillsList');
        lookingText = document.getElementById('lookingText');
        projectsList = document.getElementById('projectsList');

        setupEventListeners();

        document.addEventListener('horizon:userReady', function(e) {
            loadUserProfile(e.detail);
        });

        window.addEventListener('horizon:profileUpdate', function(e) {
            if (e.detail && e.detail.userId) refreshProfileData();
        });
    }

        async function loadUserProfile(user) {
        if (!user) return;

        profileName.textContent = user.displayName || 'Student Founder';
        profileEmail.textContent = user.email || '';
        profileAvatar.textContent = (user.displayName || 'U').charAt(0).toUpperCase();

        // Try to load from Supabase
        var profileData = {};
        var supabase = null;
        if (window.HorizonAuth) {
            if (window.HorizonAuth.loadFromSupabase) {
                var supabaseData = await window.HorizonAuth.loadFromSupabase(user.uid || user.id);
                if (supabaseData) profileData = supabaseData;
            }
            if (window.HorizonAuth.supabase) {
                supabase = window.HorizonAuth.supabase();
            }
        }
        
        // Fallback to localStorage
        if (!profileData || Object.keys(profileData).length === 0) {
            var savedProfile = localStorage.getItem('horizon_profile_' + (user.uid || user.id));
            profileData = savedProfile ? JSON.parse(savedProfile) : {};
        }

        var onboardData = localStorage.getItem('horizon_onboard_' + (user.uid || user.id));
        var onboard = onboardData ? JSON.parse(onboardData) : {};

        currentUserData = {
            bio: profileData.bio || '',
            skills: profileData.skills || (onboard.skill ? [onboard.skill] : []),
            lookingFor: profileData.looking_for || profileData.lookingFor || onboard.goal || '',
            projects: profileData.projects || []
        };

        updateProfileUI();
    }

    function updateProfileUI() {
        if (currentUserData.bio) {
            bioText.textContent = currentUserData.bio;
        } else {
            bioText.textContent = 'No bio yet. Click Edit Profile to add one.';
        }

        if (currentUserData.skills && currentUserData.skills.length > 0) {
            skillsList.innerHTML = currentUserData.skills.map(skill =>
                `<span class="skill-pill">${getSkillIcon(skill)} ${skill}</span>`
            ).join('');
        } else {
            skillsList.innerHTML = '<span class="skill-pill skill-pill-empty">No skills added yet</span>';
        }

        if (currentUserData.lookingFor) {
            lookingText.textContent = currentUserData.lookingFor;
        } else {
            lookingText.textContent = 'Not specified';
        }

        if (currentUserData.projects && currentUserData.projects.length > 0) {
            projectsList.innerHTML = currentUserData.projects.map((project, index) => `
                <div class="project-card">
                    <div class="project-header">
                        <strong class="project-title">${escapeHtml(project.title)}</strong>
                        <button class="delete-project-btn" data-index="${index}">✕</button>
                    </div>
                    ${project.description ? `<p class="project-description">${escapeHtml(project.description)}</p>` : ''}
                    ${project.live ? `<a href="${project.live}" target="_blank" class="project-link"> Live Demo</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"> GitHub</a>` : ''}
                    ${project.techStack && project.techStack.length ? `<div class="project-tech">${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>` : ''}
                </div>
            `).join('');

            document.querySelectorAll('.delete-project-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.getAttribute('data-index'));
                    deleteProject(idx);
                });
            });
        } else {
            projectsList.innerHTML = '<div class="empty-projects">No projects yet</div>';
        }
    }

    function getSkillIcon(skill) {
        const icons = {
            'Developer': '', 'Designer': '', 'Product': '',
            'Marketing': '', 'Business': '', 'AI/ML': '',
            'Blockchain': '', 'Data Science': '', 'DevOps': '', 'UI/UX': ''
        };
        return icons[skill] || '';
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function refreshProfileData() {
        const currentUser = window.HorizonAuth ? window.HorizonAuth.getCurrentUser() : null;
        if (currentUser) loadUserProfile(currentUser);
    }

    // ============================================================
    // EDIT MODE TOGGLE
    // ============================================================
    function toggleEditMode() {
        isEditMode = !isEditMode;
        const btn = document.getElementById('profileToggleEdit');
        const screen = document.getElementById('profileScreen');

        if (isEditMode) {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg> Done`;
            btn.classList.add('active');
            screen.classList.add('profile-edit-mode');
        } else {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit Profile`;
            btn.classList.remove('active');
            screen.classList.remove('profile-edit-mode');
        }
    }

    // ============================================================
    // MODAL HELPERS
    // ============================================================
    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('open');
    }
    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('open');
    }

    // ============================================================
    // BIO
    // ============================================================
    function showBioModal() {
        document.getElementById('bioInput').value = currentUserData.bio || '';
        openModal('bioModal');
    }
    function saveBio() {
        currentUserData.bio = document.getElementById('bioInput').value.trim();
        saveProfileData();
        updateProfileUI();
        closeModal('bioModal');
        if (window.showToast) window.showToast('Bio updated!', '#8AE3FF');
    }

    // ============================================================
    // SKILLS
    // ============================================================
    function showSkillsModal() {
        document.querySelectorAll('#skillsCheckboxes input').forEach(cb => cb.checked = false);
        currentUserData.skills.forEach(skill => {
            document.querySelectorAll('#skillsCheckboxes input').forEach(cb => {
                if (cb.value === skill) cb.checked = true;
            });
        });
        openModal('skillsModal');
    }
    function saveSkills() {
        const checked = document.querySelectorAll('#skillsCheckboxes input:checked');
        currentUserData.skills = Array.from(checked).map(cb => cb.value);
        saveProfileData();
        updateProfileUI();
        closeModal('skillsModal');
        if (window.showToast) window.showToast('Skills updated!', '#8AE3FF');
    }

    // ============================================================
    // LOOKING FOR
    // ============================================================
    function showLookingModal() {
        document.querySelectorAll('#lookingOptions input').forEach(r => {
            r.checked = (r.value === currentUserData.lookingFor);
        });
        openModal('lookingModal');
    }
    function saveLookingFor() {
        const selected = document.querySelector('#lookingOptions input:checked');
        if (selected) {
            currentUserData.lookingFor = selected.value;
            saveProfileData();
            updateProfileUI();
            closeModal('lookingModal');
            if (window.showToast) window.showToast('Updated!', '#8AE3FF');
        }
    }

    // ============================================================
    // PROJECTS
    // ============================================================
    function showProjectModal() {
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDesc').value = '';
        document.getElementById('projectTech').value = '';
        document.getElementById('projectLive').value = '';
        document.getElementById('projectGithub').value = '';
        openModal('projectModal');
    }
    function addProject() {
        const title = document.getElementById('projectTitle').value.trim();
        if (!title) {
            if (window.showToast) window.showToast('Project name is required', '#ff6b6b');
            return;
        }
        const techRaw = document.getElementById('projectTech').value.trim();
        const project = {
            title: title,
            description: document.getElementById('projectDesc').value.trim(),
            techStack: techRaw ? techRaw.split(',').map(t => t.trim()) : [],
            live: document.getElementById('projectLive').value.trim(),
            github: document.getElementById('projectGithub').value.trim(),
            createdAt: new Date().toISOString()
        };
        if (!currentUserData.projects) currentUserData.projects = [];
        currentUserData.projects.unshift(project);
        saveProfileData();
        updateProfileUI();
        closeModal('projectModal');
        if (window.showToast) window.showToast('Project added!', '#8AE3FF');
    }
    function deleteProject(index) {
        if (confirm('Remove this project?')) {
            currentUserData.projects.splice(index, 1);
            saveProfileData();
            updateProfileUI();
            if (window.showToast) window.showToast('Project removed', '#FFB86B');
        }
    }

    // ============================================================
    // SAVE
    // ============================================================
     function saveProfileData() {
        var user = window.HorizonAuth ? window.HorizonAuth.getCurrentUser() : null;
        if (!user) return;
        
        var profileData = {
            bio: currentUserData.bio,
            skills: currentUserData.skills,
            looking_for: currentUserData.lookingFor,
            lookingFor: currentUserData.lookingFor,
            projects: currentUserData.projects,
            updated_at: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('horizon_profile_' + (user.uid || user.id), JSON.stringify(profileData));
        
        // Save to Supabase
        if (window.HorizonAuth) {
            var supabase = window.HorizonAuth.supabase ? window.HorizonAuth.supabase() : null;
            if (supabase) {
                supabase.from('users').update(profileData).eq('auth_id', user.id).then(function(result) {
                    if (result.error) {
                        console.error("[Profile] Supabase save error:", result.error);
                    } else {
                        console.log("[Profile] Supabase save OK");
                    }
                });
            }
        }
    }

    // ============================================================
    // EVENT LISTENERS
    // ============================================================
    function setupEventListeners() {
        // Main edit toggle
        const toggleBtn = document.getElementById('profileToggleEdit');
        if (toggleBtn) toggleBtn.onclick = toggleEditMode;

        // Inline edit buttons (only work in edit mode)
        document.querySelectorAll('.profile-inline-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!isEditMode) return;
                const type = this.getAttribute('data-edit');
                if (type === 'bio') showBioModal();
                else if (type === 'skills') showSkillsModal();
                else if (type === 'looking') showLookingModal();
                else if (type === 'projects') showProjectModal();
            });
        });

        // Modal save buttons
        const saveBioBtn = document.getElementById('saveBioBtn');
        if (saveBioBtn) saveBioBtn.onclick = saveBio;
        const saveSkillsBtn = document.getElementById('saveSkillsBtn');
        if (saveSkillsBtn) saveSkillsBtn.onclick = saveSkills;
        const saveLookingBtn = document.getElementById('saveLookingBtn');
        if (saveLookingBtn) saveLookingBtn.onclick = saveLookingFor;
        const saveProjectBtn = document.getElementById('saveProjectBtn');
        if (saveProjectBtn) saveProjectBtn.onclick = addProject;

        // Modal close buttons
        document.querySelectorAll('.prof-modal-close, .prof-btn-ghost').forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-close');
                if (target === 'bio') closeModal('bioModal');
                else if (target === 'skills') closeModal('skillsModal');
                else if (target === 'looking') closeModal('lookingModal');
                else if (target === 'project') closeModal('projectModal');
            });
        });

        // Close modal on overlay click
        document.querySelectorAll('.prof-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) this.classList.remove('open');
            });
        });
    }

    // ============================================================
    // PUBLIC API
    // ============================================================
    window.HorizonProfile = {
        init: initProfile,
        refresh: refreshProfileData,
        getUserProfile: () => currentUserData,
        updateSkills: (skills) => {
            currentUserData.skills = skills;
            saveProfileData();
            updateProfileUI();
        }
    };

})();

document.addEventListener('DOMContentLoaded', function() {
    if (window.HorizonProfile) window.HorizonProfile.init();
});
