// ============================================================
// HORIZON STARTUP MODULE - SUPABASE EDITION
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // INJECT CSS
    // ============================================================
    function injectStartupCSS() {
        const styleId = 'horizon-startup-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .create-startup-btn {
                width: 100%;
                padding: 14px 20px;
                background: linear-gradient(135deg, #8AE3FF, #FFB86B);
                border: none;
                border-radius: 14px;
                font-size: 14px;
                font-weight: 600;
                color: #000000;
                cursor: pointer;
                margin-bottom: 20px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            .create-startup-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(138, 227, 255, 0.3);
            }
            .search-startup-container {
                margin-bottom: 16px;
            }
            .search-wrapper {
                position: relative;
            }
            .search-startup-box {
                width: 100%;
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(138, 227, 255, 0.15);
                border-radius: 14px;
                color: #ffffff;
                font-size: 14px;
                transition: all 0.2s;
            }
            .search-startup-box:focus {
                outline: none;
                border-color: #8AE3FF;
                background: rgba(138, 227, 255, 0.05);
            }
            .search-startup-box::placeholder {
                color: #555555;
            }
            .clear-search-btn {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 16px;
                padding: 4px 8px;
                display: none;
            }
            .clear-search-btn:hover {
                color: #8AE3FF;
            }
            .search-stats {
                font-size: 11px;
                color: #666666;
                margin-top: 8px;
                text-align: right;
            }
            .startups-list {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .startup-card {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(138, 227, 255, 0.1);
                border-radius: 24px;
                padding: 18px;
                transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                cursor: pointer;
                backdrop-filter: blur(10px);
            }
            .startup-card:hover {
                background: rgba(255, 255, 255, 0.07);
                border-color: rgba(138, 227, 255, 0.3);
                transform: translateY(-4px);
                box-shadow: 0 8px 32px rgba(138, 227, 255, 0.1);
            }
            .startup-card-inner {
                display: flex;
                gap: 14px;
            }
            .startup-logo {
                width: 56px;
                height: 56px;
                background: linear-gradient(135deg, #8AE3FF, #FFB86B);
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 22px;
                color: #000000;
                flex-shrink: 0;
            }
            .startup-info {
                flex: 1;
            }
            .startup-name-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 6px;
            }
            .startup-name {
                font-weight: 700;
                font-size: 16px;
                color: #ffffff;
            }
            .match-badge {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 3px 10px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
            }
            .match-high {
                background: rgba(138, 227, 255, 0.15);
                color: #8AE3FF;
            }
            .match-medium {
                background: rgba(255, 184, 107, 0.12);
                color: #FFB86B;
            }
            .match-low {
                background: rgba(255, 255, 255, 0.06);
                color: #888888;
            }
            .startup-desc {
                font-size: 13px;
                color: #aaaaaa;
                line-height: 1.4;
                margin-bottom: 8px;
            }
            .startup-meta {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-bottom: 8px;
            }
            .startup-meta span {
                font-size: 11px;
                color: #666666;
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }
            .startup-skills {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-bottom: 10px;
            }
            .skill-tag {
                background: rgba(255, 255, 255, 0.08);
                padding: 4px 12px;
                border-radius: 16px;
                font-size: 10px;
                color: #FFFFFF;
                border: 1px solid rgba(255, 255, 255, 0.12);
            }
            .startup-actions {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 8px;
                padding-top: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.06);
            }
            .profile-btn {
                padding: 8px 20px;
                background: linear-gradient(135deg, #8AE3FF, #FFB86B);
                border: none;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                color: #000000;
                cursor: pointer;
                transition: all 0.2s;
            }
            .profile-btn:hover {
                transform: scale(1.02);
                box-shadow: 0 4px 12px rgba(138, 227, 255, 0.3);
            }
            .save-btn {
                padding: 8px 14px;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                font-size: 14px;
                color: #aaaaaa;
                cursor: pointer;
                transition: all 0.2s;
            }
            .save-btn:hover {
                background: rgba(138, 227, 255, 0.1);
                color: #8AE3FF;
                border-color: rgba(138, 227, 255, 0.2);
            }
            .startup-profile-modal, .create-startup-modal, .join-request-modal {
                width: 360px;
                max-width: calc(100% - 32px);
                max-height: 85vh;
                overflow-y: auto;
                background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
                border: 1px solid rgba(138, 227, 255, 0.2);
                border-radius: 24px;
                padding: 24px;
                animation: modalFadeIn 0.3s ease;
            }
            @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .modal-header h3 {
                font-size: 20px;
                font-weight: 700;
                color: #ffffff;
            }
            .modal-close {
                width: 32px;
                height: 32px;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                color: #aaaaaa;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.15s;
            }
            .modal-close:hover {
                background: rgba(138, 227, 255, 0.1);
                color: #8AE3FF;
            }
            .form-group {
                margin-bottom: 16px;
            }
            .form-label {
                display: block;
                font-size: 11px;
                font-weight: 600;
                color: #8AE3FF;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 6px;
            }
            .form-input, .form-select, .form-textarea {
                width: 100%;
                padding: 12px 14px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                color: #ffffff;
                font-size: 14px;
                font-family: inherit;
                transition: all 0.2s;
            }
            .form-textarea {
                resize: vertical;
                min-height: 80px;
            }
            .form-input:focus, .form-select:focus, .form-textarea:focus {
                outline: none;
                border-color: #8AE3FF;
                background: rgba(138, 227, 255, 0.05);
            }
            .form-input::placeholder, .form-textarea::placeholder {
                color: #555555;
            }
            .form-select {
                cursor: pointer;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 14px center;
            }
            .form-select option {
                background: #1e1e1e !important;
                color: #ffffff !important;
                padding: 12px !important;
                font-size: 14px !important;
            }
            .skills-checkbox-group {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 8px;
            }
            .skill-checkbox {
                --unchecked-color: #2a2a2a;
                --checked-color: linear-gradient(135deg, #8AE3FF, #FFB86B);
                --font-color: #ffffff;
                --checked-font-color: #000000;
                --icon-size: 14px;
                --anim-time: 0.2s;
                --anim-scale: 0.05;
                --base-radius: 12px;
                
                display: inline-flex;
                align-items: center;
                position: relative;
                cursor: pointer;
                font-size: 13px;
                user-select: none;
                fill: var(--font-color);
                color: var(--font-color);
            }
            .skill-checkbox input {
                display: none;
            }
            .skill-checkbox .checkmark {
                background: var(--unchecked-color);
                border-radius: var(--base-radius);
                display: inline-flex;
                align-items: center;
                padding: 6px 12px;
                gap: 6px;
                transition: all var(--anim-time);
                white-space: nowrap;
            }
            .skill-checkbox .icon {
                width: var(--icon-size);
                height: auto;
            }
            .skill-checkbox .Yes {
                display: none;
            }
            .skill-checkbox .name.Yes {
                display: none;
            }
            .skill-checkbox .No {
                display: inline-block;
            }
            .skill-checkbox .name.No {
                display: inline-block;
            }
            .skill-checkbox:hover .checkmark {
                transform: scale(calc(1 + var(--anim-scale)));
                background: #3a3a3a;
            }
            .skill-checkbox input:checked + .checkmark {
                background: linear-gradient(135deg, #8AE3FF, #FFB86B);
                fill: var(--checked-font-color);
                color: var(--checked-font-color);
            }
            .skill-checkbox input:checked ~ .checkmark .No {
                display: none;
            }
            .skill-checkbox input:checked ~ .checkmark .name.No {
                display: none;
            }
            .skill-checkbox input:checked ~ .checkmark .Yes {
                display: inline-block;
            }
            .skill-checkbox input:checked ~ .checkmark .name.Yes {
                display: inline-block;
            }
            .modal-footer {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }
            .btn-primary {
                flex: 1;
                padding: 12px;
                background: linear-gradient(135deg, #8AE3FF, #FFB86B);
                border: none;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                color: #000000;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(138, 227, 255, 0.3);
            }
            .btn-secondary {
                flex: 1;
                padding: 12px;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                color: #aaaaaa;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
            }
            .info-section {
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            }
            .info-label {
                font-size: 11px;
                font-weight: 600;
                color: #8AE3FF;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
            }
            .info-value {
                font-size: 14px;
                color: #dddddd;
                line-height: 1.5;
            }
            .team-member {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            }
            .team-member-name {
                font-size: 14px;
                font-weight: 600;
                color: #ffffff;
            }
            .team-member-role {
                font-size: 11px;
                color: #8AE3FF;
            }
            .empty-startups {
                text-align: center;
                padding: 50px 20px;
            }
            .empty-startups-icon {
                font-size: 50px;
                margin-bottom: 16px;
                opacity: 0.5;
            }
            .empty-startups-text {
                color: #666666;
                font-size: 14px;
                margin-bottom: 20px;
            }
            .prof-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(6px);
            }
            .prof-modal-overlay[style*="display: flex"], 
            .prof-modal-overlay[style*="display:flex"] {
                display: flex !important;
            }
            @media (max-width: 390px) {
                .startup-profile-modal, .create-startup-modal, .join-request-modal {
                    width: 96%;
                    padding: 20px 16px;
                }
                .form-input, .form-select, .form-textarea {
                    padding: 14px 16px;
                    font-size: 16px;
                }
                .modal-footer {
                    flex-direction: column;
                    gap: 10px;
                }
                .startup-card {
                    padding: 14px;
                }
                .startup-logo {
                    width: 48px;
                    height: 48px;
                    font-size: 18px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // STATE
    // ============================================================
    let currentUser = null;
    let allStartups = [];
    let currentSearchTerm = '';
    let filteredStartupsCache = [];
    let supabaseRealtimeChannel = null;

    // SAMPLE STARTUPS (shown as examples)
    const SAMPLE_STARTUPS = [
        {
            id: 'sample_1',
            name: 'Nova Labs',
            tagline: 'Simplifying student payments with UPI',
            stage: 'Building MVP',
            needed_skills: ['React Developer', 'UI Designer', 'Backend Engineer'],
            location: 'Remote',
            required_commitment: 'Part-time',
            compensation: 'Equity',
            team_size: 3,
            logo: 'NL',
            founder_name: 'Arun R',
            founder_email: 'arun@novalabs.com',
            founder_id: 'founder_1',
            team: [
                { name: 'Arun R', role: 'Founder and CEO', email: 'arun@novalabs.com' },
                { name: 'Priya S', role: 'Lead Developer', email: 'priya@novalabs.com' }
            ]
        },
        {
            id: 'sample_2',
            name: 'Orb',
            tagline: 'AI-powered content curation for students',
            stage: 'Just an idea',
            needed_skills: ['ML Engineer', 'Frontend Developer', 'Product Manager'],
            location: 'Remote',
            required_commitment: 'Weekends',
            compensation: 'Equity',
            team_size: 2,
            logo: 'OR',
            founder_name: 'Maria S',
            founder_email: 'maria@orb.ai',
            founder_id: 'founder_2',
            team: [{ name: 'Maria S', role: 'Founder', email: 'maria@orb.ai' }]
        },
        {
            id: 'sample_3',
            name: 'FinTrack',
            tagline: 'Personal finance made simple',
            stage: 'Launched',
            needed_skills: ['Marketing Lead', 'Growth Hacker', 'Content Creator'],
            location: 'Hybrid',
            required_commitment: 'Part-time',
            compensation: 'Stipend plus Equity',
            team_size: 4,
            logo: 'FT',
            founder_name: 'Rohan K',
            founder_email: 'rohan@fintrack.com',
            founder_id: 'founder_3',
            team: [{ name: 'Rohan K', role: 'Founder', email: 'rohan@fintrack.com' }]
        },
        {
            id: 'sample_4',
            name: 'SkillBridge',
            tagline: 'Connecting students with industry mentors',
            stage: 'Building MVP',
            needed_skills: ['Full Stack Developer', 'UX Designer'],
            location: 'Remote',
            required_commitment: 'Part-time',
            compensation: 'Equity',
            team_size: 3,
            logo: 'SB',
            founder_name: 'Amit P',
            founder_email: 'amit@skillbridge.com',
            founder_id: 'founder_4',
            team: [{ name: 'Amit P', role: 'Founder', email: 'amit@skillbridge.com' }]
        },
        {
            id: 'sample_5',
            name: 'EcoCart',
            tagline: 'Sustainable shopping made easy',
            stage: 'Launched',
            needed_skills: ['React Native Developer', 'Marketing Specialist'],
            location: 'In-person',
            required_commitment: 'Full-time',
            compensation: 'Salary plus Equity',
            team_size: 5,
            logo: 'EC',
            founder_name: 'Sneha M',
            founder_email: 'sneha@ecocart.com',
            founder_id: 'founder_5',
            team: [{ name: 'Sneha M', role: 'Founder and CEO', email: 'sneha@ecocart.com' }]
        }
    ];

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================
    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function showToast(message, color) {
        var toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:' + (color || '#8AE3FF') + ';color:#000;padding:11px 18px;border-radius:28px;font-size:12px;font-weight:600;z-index:10000;pointer-events:none';
        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 2500);
    }

    function getSupabaseClient() {
        if (window.HorizonAuth && window.HorizonAuth.supabase) {
            return window.HorizonAuth.supabase();
        }
        return null;
    }

    function calculateMatchScore(user, startup) {
        if (!user) return 0;
        var score = 50;
        
        // Normalize needed_skills to array
        var neededSkills = startup.needed_skills || startup.neededSkills || [];
        
        if (user.primarySkill && neededSkills) {
            for (var i = 0; i < neededSkills.length; i++) {
                if (neededSkills[i].toLowerCase().includes(user.primarySkill.toLowerCase())) {
                    score += 30;
                    break;
                }
            }
        }
        if (user.startupStage === startup.stage) score += 10;
        if (score > 100) score = 100;
        return score;
    }

    // ============================================================
    // SEARCH FUNCTIONS
    // ============================================================
    function searchStartups(searchTerm) {
        currentSearchTerm = searchTerm.toLowerCase().trim();
        
        if (!currentSearchTerm) {
            filteredStartupsCache = [...allStartups];
        } else {
            filteredStartupsCache = allStartups.filter(function(startup) {
                if (startup.name && startup.name.toLowerCase().includes(currentSearchTerm)) return true;
                if (startup.tagline && startup.tagline.toLowerCase().includes(currentSearchTerm)) return true;
                var skills = startup.needed_skills || startup.neededSkills || [];
                if (skills.some(function(skill) {
                    return skill.toLowerCase().includes(currentSearchTerm);
                })) return true;
                if (startup.founder_name && startup.founder_name.toLowerCase().includes(currentSearchTerm)) return true;
                if (startup.founderName && startup.founderName.toLowerCase().includes(currentSearchTerm)) return true;
                if (startup.stage && startup.stage.toLowerCase().includes(currentSearchTerm)) return true;
                if (startup.location && startup.location.toLowerCase().includes(currentSearchTerm)) return true;
                return false;
            });
        }
        
        updateSearchStats();
        displayStartups(filteredStartupsCache);
    }
    
    function updateSearchStats() {
        var statsElement = document.getElementById('startupSearchStats');
        if (statsElement) {
            var showing = filteredStartupsCache.length;
            var total = allStartups.length;
            if (currentSearchTerm) {
                statsElement.textContent = 'Found ' + showing + ' of ' + total + ' startups matching "' + currentSearchTerm + '"';
            } else {
                statsElement.textContent = total + ' startups available';
            }
        }
    }
    
    function clearSearch() {
        currentSearchTerm = '';
        var searchInput = document.getElementById('startupSearchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        filteredStartupsCache = [...allStartups];
        updateSearchStats();
        displayStartups(filteredStartupsCache);
        
        var clearBtn = document.getElementById('clearStartupSearch');
        if (clearBtn) clearBtn.style.display = 'none';
    }

    // ============================================================
    // DISPLAY STARTUPS
    // ============================================================
    function displayStartups(startups) {
        var startupsList = document.getElementById('startupsList');
        if (!startupsList) return;
        
        if (!startups || startups.length === 0) {
            startupsList.innerHTML = '<div class="empty-startups"><div class="empty-startups-icon">🚀</div><div class="empty-startups-text">No startups yet</div><button class="create-startup-btn" id="emptyCreateBtn">+ Create Your First Startup</button></div>';
            var emptyBtn = document.getElementById('emptyCreateBtn');
            if (emptyBtn) emptyBtn.addEventListener('click', function() { showCreateStartupModal(); });
            return;
        }
        
        var startupsToShow = [];
        for (var i = 0; i < startups.length; i++) {
            var startupCopy = JSON.parse(JSON.stringify(startups[i]));
            if (currentUser) {
                startupCopy.matchScore = calculateMatchScore(currentUser, startupCopy);
            } else {
                startupCopy.matchScore = 0;
            }
            startupsToShow.push(startupCopy);
        }
        
        if (currentUser) {
            startupsToShow.sort(function(a, b) { return b.matchScore - a.matchScore; });
        }
        
        var html = '';
        for (var i = 0; i < startupsToShow.length; i++) {
            var startup = startupsToShow[i];
            var matchScore = startup.matchScore || 0;
            var matchClass = 'match-low';
            if (matchScore >= 70) matchClass = 'match-high';
            else if (matchScore >= 50) matchClass = 'match-medium';
            
            var skillsHtml = '';
            var neededSkills = startup.needed_skills || startup.neededSkills || [];
            for (var j = 0; j < Math.min(3, neededSkills.length); j++) {
                skillsHtml += '<span class="skill-tag">' + escapeHtml(neededSkills[j]) + '</span>';
            }
            
            html += `
                <div class="startup-card" data-startup-id="${startup.id}">
                    <div class="startup-card-inner">
                        <div class="startup-logo">${escapeHtml(startup.logo || startup.name.substring(0,2).toUpperCase())}</div>
                        <div class="startup-info">
                            <div class="startup-name-row">
                                <span class="startup-name">${escapeHtml(startup.name)}</span>
                                ${matchScore > 0 ? '<span class="match-badge ' + matchClass + '">' + matchScore + '% Match</span>' : ''}
                            </div>
                            <div class="startup-desc">${escapeHtml(startup.tagline || 'No description')}</div>
                            <div class="startup-meta">
                                <span>Stage: ${escapeHtml(startup.stage || 'Idea')}</span>
                                <span>Team: ${startup.team_size || startup.teamSize || 1}</span>
                                <span>Location: ${escapeHtml(startup.location || 'Remote')}</span>
                            </div>
                            ${skillsHtml ? '<div class="startup-skills">' + skillsHtml + '</div>' : ''}
                        </div>
                    </div>
                    <div class="startup-actions">
                        <button class="profile-btn" data-startup-id="${startup.id}">View Profile</button>
                        <button class="save-btn" data-startup-id="${startup.id}">Save</button>
                    </div>
                </div>
            `;
        }
        
        startupsList.innerHTML = html;
        
        var profileBtns = document.querySelectorAll('.profile-btn');
        for (var i = 0; i < profileBtns.length; i++) {
            profileBtns[i].addEventListener('click', function(e) {
                e.stopPropagation();
                var id = this.getAttribute('data-startup-id');
                showStartupProfile(id);
            });
        }
        
        var saveBtns = document.querySelectorAll('.save-btn');
        for (var i = 0; i < saveBtns.length; i++) {
            saveBtns[i].addEventListener('click', function(e) {
                e.stopPropagation();
                var id = this.getAttribute('data-startup-id');
                saveStartupForLater(id);
            });
        }
        
        var cards = document.querySelectorAll('.startup-card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', function(e) {
                if (e.target.classList.contains('profile-btn') || e.target.classList.contains('save-btn')) return;
                var id = this.getAttribute('data-startup-id');
                showStartupProfile(id);
            });
        }
    }

    // ============================================================
    // SHOW STARTUP PROFILE
    // ============================================================
    function showStartupProfile(startupId) {
        var startup = null;
        for (var i = 0; i < allStartups.length; i++) {
            if (allStartups[i].id === startupId || String(allStartups[i].id) === String(startupId)) {
                startup = allStartups[i];
                break;
            }
        }
        
        if (!startup) {
            showToast('Startup not found', '#ff6b6b');
            return;
        }
        
        var isOwner = currentUser && (startup.founder_id === currentUser.id || startup.founderId === currentUser.uid);
        
        var modal = document.createElement('div');
        modal.className = 'prof-modal-overlay';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:10001;display:flex;align-items:center;justify-content:center;';
        
        var team = startup.team || [{ name: startup.founder_name || startup.founderName, role: 'Founder', email: startup.founder_email || startup.founderEmail }];
        var teamHtml = '';
        for (var j = 0; j < team.length; j++) {
            teamHtml += `
                <div class="team-member">
                    <div>
                        <div class="team-member-name">${escapeHtml(team[j].name)}</div>
                        <div class="team-member-role">${escapeHtml(team[j].role)}</div>
                    </div>
                    <div style="font-size: 11px; color: #666;">${escapeHtml(team[j].email || '')}</div>
                </div>
            `;
        }
        
        var neededSkills = startup.needed_skills || startup.neededSkills || [];
        var skillsHtml = '';
        for (var k = 0; k < neededSkills.length; k++) {
            skillsHtml += '<span class="skill-tag">' + escapeHtml(neededSkills[k]) + '</span>';
        }
        
        modal.innerHTML = `
            <div class="startup-profile-modal">
                <div class="modal-header">
                    <h3>${escapeHtml(startup.name)}</h3>
                    <button class="modal-close" onclick="this.closest('.prof-modal-overlay').remove()">&times;</button>
                </div>
                
                <div class="info-section">
                    <div class="info-label">About</div>
                    <div class="info-value">${escapeHtml(startup.tagline || 'No description')}</div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">Startup Information</div>
                    <div class="info-value">
                        <div style="margin-bottom: 8px;"><strong style="color:#8AE3FF;">Stage:</strong> ${escapeHtml(startup.stage || 'Idea')}</div>
                        <div style="margin-bottom: 8px;"><strong style="color:#8AE3FF;">Location:</strong> ${escapeHtml(startup.location || 'Remote')}</div>
                        <div style="margin-bottom: 8px;"><strong style="color:#8AE3FF;">Compensation:</strong> ${escapeHtml(startup.compensation || 'Equity')}</div>
                        <div style="margin-bottom: 8px;"><strong style="color:#8AE3FF;">Commitment:</strong> ${escapeHtml(startup.required_commitment || startup.requiredCommitment || 'Part-time')}</div>
                        <div><strong style="color:#8AE3FF;">Skills Needed:</strong></div>
                        <div class="startup-skills" style="margin-top: 6px;">${skillsHtml}</div>
                    </div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">Founder</div>
                    <div class="info-value">
                        <div><strong>${escapeHtml(startup.founder_name || startup.founderName)}</strong></div>
                        <div style="font-size: 12px; color: #888;">${escapeHtml((startups.founder_email || startup.founderEmail) || 'No email')}</div>
                    </div>
                </div>
                
                <div class="info-section">
                    <div class="info-label">Team Members (${team.length})</div>
                    <div class="info-value">${teamHtml}</div>
                </div>
                
                ${!isOwner && currentUser ? '<div class="modal-footer"><button class="btn-primary" id="openApplyBtn">Apply to Join</button><button class="btn-secondary" onclick="this.closest(\'.prof-modal-overlay\').remove()">Close</button></div>' : ''}
                ${!currentUser ? '<div style="text-align: center; padding: 16px; background: rgba(255, 107, 107, 0.1); border-radius: 12px; margin-top: 16px;"><p style="font-size: 12px; color: #ff6b6b;">Please sign in to apply</p></div><div class="modal-footer"><button class="btn-secondary" onclick="this.closest(\'.prof-modal-overlay\').remove()">Close</button></div>' : ''}
                ${isOwner ? '<div class="modal-footer"><button class="btn-primary" id="editStartupBtn">Edit Startup</button><button class="btn-secondary" onclick="this.closest(\'.prof-modal-overlay\').remove()">Close</button></div>' : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        var applyBtn = document.getElementById('openApplyBtn');
        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                modal.remove();
                showJoinRequestModal(startup);
            });
        }
        
        var editBtn = document.getElementById('editStartupBtn');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                modal.remove();
                editStartup(startup.id);
            });
        }
    }
    
    // ============================================================
    // SHOW JOIN REQUEST MODAL
    // ============================================================
    function showJoinRequestModal(startup) {
        if (!currentUser) {
            showToast('Please sign in first', '#ff6b6b');
            return;
        }
        
        var modal = document.createElement('div');
        modal.className = 'prof-modal-overlay';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:10002;display:flex;align-items:center;justify-content:center;';
        
        var availableRoles = ['Developer', 'Designer', 'Product Manager', 'Marketer', 'Business Analyst', 'Content Creator', 'Sales'];
        var rolesOptions = '';
        for (var i = 0; i < availableRoles.length; i++) {
            rolesOptions += '<option value="' + availableRoles[i] + '">' + availableRoles[i] + '</option>';
        }
        
        var availableSkills = ['React', 'Node.js', 'Python', 'UI/UX', 'Figma', 'Marketing', 'SEO', 'Sales', 'Project Management'];
        var skillsHtml = '';
        for (var j = 0; j < availableSkills.length; j++) {
            skillsHtml += `
                <label class="skill-checkbox">
                    <input type="checkbox" value="${availableSkills[j]}">
                    <div class="checkmark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon No" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span class="name No">${availableSkills[j]}</span>
                        <svg viewBox="0 0 24 24" class="icon Yes" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span class="name Yes">${availableSkills[j]}</span>
                    </div>
                </label>
            `;
        }

        var userEmail = currentUser.email || '';
        var escapedEmail = escapeHtml(userEmail);

        modal.innerHTML = `
            <div class="join-request-modal">
                <div class="modal-header">
                    <h3>Apply to ${escapeHtml(startup.name)}</h3>
                    <button class="modal-close" onclick="this.closest('.prof-modal-overlay').remove()">&times;</button>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Your Email</label>
                    <input type="email" id="applicantEmail" class="form-input" value="${escapedEmail}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Select Role</label>
                    <select id="applicantRole" class="form-select">
                        <option value="">Select a role...</option>
                        ${rolesOptions}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Your Skills</label>
                    <div class="skills-checkbox-group" id="skillsChecklist">${skillsHtml}</div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea id="applicantMessage" class="form-textarea" placeholder="Why do you want to join this startup?"></textarea>
                </div>
                
                <div class="modal-footer">
                    <button class="btn-primary" id="submitApplyBtn">Send Application</button>
                    <button class="btn-secondary" onclick="this.closest('.prof-modal-overlay').remove()">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        var submitBtn = document.getElementById('submitApplyBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                var email = document.getElementById('applicantEmail').value.trim();
                var role = document.getElementById('applicantRole').value;
                var message = document.getElementById('applicantMessage').value.trim();
                
                var skills = [];
                var checkboxes = document.querySelectorAll('#skillsChecklist input:checked');
                for (var i = 0; i < checkboxes.length; i++) {
                    skills.push(checkboxes[i].value);
                }
                
                if (!email) {
                    showToast('Email is required', '#ff6b6b');
                    return;
                }
                if (!role) {
                    showToast('Please select a role', '#ff6b6b');
                    return;
                }
                
                var applications = JSON.parse(localStorage.getItem('horizon_applications') || '[]');
                applications.push({
                    startupId: startup.id,
                    startupName: startup.name,
                    userName: currentUser.displayName || 'Anonymous',
                    userEmail: email,
                    role: role,
                    skills: skills,
                    message: message,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('horizon_applications', JSON.stringify(applications));
                
                showToast('Application sent to ' + startup.name, '#8AE3FF');
                modal.remove();
            });
        }
    }
    
    // ============================================================
    // EDIT STARTUP
    // ============================================================
    function editStartup(startupId) {
        var startup = null;
        for (var i = 0; i < allStartups.length; i++) {
            if (String(allStartups[i].id) === String(startupId)) {
                startup = allStartups[i];
                break;
            }
        }
        if (!startup) return;
        
        var modal = document.createElement('div');
        modal.className = 'prof-modal-overlay';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:10002;display:flex;align-items:center;justify-content:center;';
        
        var neededSkills = startup.needed_skills || startup.neededSkills || [];
        
        modal.innerHTML = `
            <div class="create-startup-modal">
                <div class="modal-header">
                    <h3>Edit ${escapeHtml(startup.name)}</h3>
                    <button class="modal-close" onclick="this.closest('.prof-modal-overlay').remove()">&times;</button>
                </div>
                <div class="form-group">
                    <label class="form-label">Startup Name</label>
                    <input type="text" id="editName" class="form-input" value="${escapeHtml(startup.name)}">
                </div>
                <div class="form-group">
                    <label class="form-label">Tagline</label>
                    <input type="text" id="editTagline" class="form-input" value="${escapeHtml(startup.tagline || '')}">
                </div>
                <div class="form-group">
                    <label class="form-label">Stage</label>
                    <select id="editStage" class="form-select">
                        <option value="Just an idea" ${startup.stage === 'Just an idea' ? 'selected' : ''}>Just an idea</option>
                        <option value="Building MVP" ${startup.stage === 'Building MVP' ? 'selected' : ''}>Building MVP</option>
                        <option value="Launched" ${startup.stage === 'Launched' ? 'selected' : ''}>Launched</option>
                        <option value="Revenue" ${startup.stage === 'Revenue' ? 'selected' : ''}>Revenue</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Location</label>
                    <select id="editLocation" class="form-select">
                        <option value="Remote" ${startup.location === 'Remote' ? 'selected' : ''}>Remote</option>
                        <option value="Hybrid" ${startup.location === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
                        <option value="In-person" ${startup.location === 'In-person' ? 'selected' : ''}>In-person</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Skills Needed</label>
                    <input type="text" id="editSkills" class="form-input" value="${neededSkills.join(', ')}">
                </div>
                <div class="form-group">
                    <label class="form-label">Compensation</label>
                    <select id="editCompensation" class="form-select">
                        <option value="Equity" ${startup.compensation === 'Equity' ? 'selected' : ''}>Equity</option>
                        <option value="Stipend" ${startup.compensation === 'Stipend' ? 'selected' : ''}>Stipend</option>
                        <option value="Unpaid" ${startup.compensation === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
                        <option value="Salary" ${startup.compensation === 'Salary' ? 'selected' : ''}>Salary</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Commitment</label>
                    <select id="editCommitment" class="form-select">
                        <option value="Full-time" ${(startup.required_commitment || startup.requiredCommitment) === 'Full-time' ? 'selected' : ''}>Full-time</option>
                        <option value="Part-time" ${(startup.required_commitment || startup.requiredCommitment) === 'Part-time' ? 'selected' : ''}>Part-time</option>
                        <option value="Weekends" ${(startup.required_commitment || startup.requiredCommitment) === 'Weekends' ? 'selected' : ''}>Weekends</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="saveEditBtn">Save Changes</button>
                    <button class="btn-secondary" onclick="this.closest('.prof-modal-overlay').remove()">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('saveEditBtn').addEventListener('click', async function() {
            startup.name = document.getElementById('editName').value.trim();
            startup.tagline = document.getElementById('editTagline').value.trim();
            startup.stage = document.getElementById('editStage').value;
            startup.location = document.getElementById('editLocation').value;
            var skillsValue = document.getElementById('editSkills').value;
            var skillsArray = skillsValue.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
            startup.needed_skills = skillsArray;
            startup.neededSkills = skillsArray;
            startup.compensation = document.getElementById('editCompensation').value;
            startup.required_commitment = document.getElementById('editCommitment').value;
            startup.requiredCommitment = startup.required_commitment;
            startup.updated_at = new Date().toISOString();
            startup.updatedAt = startup.updated_at;
            
            // Persist to localStorage
            localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));
            
            // Persist to Supabase
            var supabase = getSupabaseClient();
            if (supabase) {
                try {
                    var updateData = {
                        name: startup.name,
                        tagline: startup.tagline,
                        stage: startup.stage,
                        location: startup.location,
                        needed_skills: skillsArray,
                        compensation: startup.compensation,
                        required_commitment: startup.required_commitment,
                        updated_at: startup.updated_at
                    };
                    var result = await supabase.from('startups').update(updateData).eq('id', startup.id);
                    if (result.error) throw result.error;
                    console.log("[Startups] Supabase update OK");
                } catch(e) {
                    console.error("[Startups] Supabase update error:", e);
                }
            }
            
            showToast('Startup updated successfully', '#8AE3FF');
            modal.remove();
            filteredStartupsCache = [...allStartups];
            updateSearchStats();
            displayStartups(filteredStartupsCache);
        });
    }

    // ============================================================
    // SAVE STARTUP FOR LATER
    // ============================================================
    function saveStartupForLater(startupId) {
        if (!currentUser) {
            showToast('Please sign in first', '#ff6b6b');
            return;
        }
        
        var saved = JSON.parse(localStorage.getItem('saved_startups_' + currentUser.id) || '[]');
        
        var alreadySaved = false;
        for (var i = 0; i < saved.length; i++) {
            if (saved[i] === startupId) {
                alreadySaved = true;
                break;
            }
        }
        
        if (alreadySaved) {
            var newSaved = [];
            for (var j = 0; j < saved.length; j++) {
                if (saved[j] !== startupId) newSaved.push(saved[j]);
            }
            localStorage.setItem('saved_startups_' + currentUser.id, JSON.stringify(newSaved));
            showToast('Removed from saved', '#FFB86B');
        } else {
            saved.push(startupId);
            localStorage.setItem('saved_startups_' + currentUser.id, JSON.stringify(saved));
            showToast('Saved for later', '#8AE3FF');
        }
    }

    // ============================================================
    // CREATE STARTUP MODAL
    // ============================================================
    function showCreateStartupModal() {
        if (!currentUser && window.HorizonAuth) {
            currentUser = window.HorizonAuth.getCurrentUser();
        }
        
        if (!currentUser) {
            showToast('Please sign in first', '#ff6b6b');
            return;
        }
        
        var existingModal = document.querySelector('.prof-modal-overlay.create-startup-modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        var modal = document.createElement('div');
        modal.className = 'prof-modal-overlay create-startup-modal-overlay';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:10002;display:flex;align-items:center;justify-content:center;';
        
        var userEmail = currentUser.email || '';
        var escapedEmail = escapeHtml(userEmail);
        var userName = currentUser.displayName || 'Founder';
        
        modal.innerHTML = `
            <div class="create-startup-modal">
                <div class="modal-header">
                    <h3>Launch Your Startup</h3>
                    <button class="modal-close" onclick="this.closest('.prof-modal-overlay').remove()">&times;</button>
                </div>
                <div class="form-group">
                    <label class="form-label">Startup Name *</label>
                    <input type="text" id="newStartupName" class="form-input" placeholder="e.g. Nova Labs">
                </div>
                <div class="form-group">
                    <label class="form-label">Tagline</label>
                    <input type="text" id="newStartupTagline" class="form-input" placeholder="What makes your startup special?">
                </div>
                <div class="form-group">
                    <label class="form-label">Stage</label>
                    <select id="newStartupStage" class="form-select">
                        <option value="Just an idea">Just an idea</option>
                        <option value="Building MVP">Building MVP</option>
                        <option value="Launched">Launched</option>
                        <option value="Revenue">Revenue</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Location</label>
                    <select id="newStartupLocation" class="form-select">
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="In-person">In-person</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Skills Needed</label>
                    <input type="text" id="newStartupSkills" class="form-input" placeholder="React, Python, UI/UX">
                </div>
                <div class="form-group">
                    <label class="form-label">Compensation</label>
                    <select id="newStartupCompensation" class="form-select">
                        <option value="Equity">Equity</option>
                        <option value="Stipend">Stipend</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Salary">Salary</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Commitment</label>
                    <select id="newStartupCommitment" class="form-select">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Weekends">Weekends</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Contact Email</label>
                    <input type="email" id="newStartupEmail" class="form-input" value="${escapedEmail}">
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="confirmCreateBtn">Create Startup</button>
                    <button class="btn-secondary" onclick="this.closest('.prof-modal-overlay').remove()">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        var confirmBtn = document.getElementById('confirmCreateBtn');
        if (confirmBtn) {
            confirmBtn.onclick = function() {
                var name = document.getElementById('newStartupName').value.trim();
                if (!name) {
                    showToast('Startup name is required', '#ff6b6b');
                    return;
                }
                
                var email = document.getElementById('newStartupEmail').value.trim();
                if (!email) {
                    showToast('Contact email is required', '#ff6b6b');
                    return;
                }
                
                var skillsInput = document.getElementById('newStartupSkills').value.trim();
                var skillsArray = [];
                if (skillsInput) {
                    skillsArray = skillsInput.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
                }
                
                var newStartup = {
                    name: name,
                    tagline: document.getElementById('newStartupTagline').value.trim(),
                    stage: document.getElementById('newStartupStage').value,
                    location: document.getElementById('newStartupLocation').value,
                    needed_skills: skillsArray,
                    neededSkills: skillsArray,
                    compensation: document.getElementById('newStartupCompensation').value,
                    required_commitment: document.getElementById('newStartupCommitment').value,
                    requiredCommitment: document.getElementById('newStartupCommitment').value,
                    founder_name: userName,
                    founderName: userName,
                    founder_email: email,
                    founderEmail: email,
                    founder_id: currentUser.id,
                    founderId: currentUser.id,
                    team_size: 1,
                    teamSize: 1,
                    logo: name.substring(0,2).toUpperCase(),
                    created_at: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    team: [{ name: userName, role: 'Founder', email: email }]
                };
                
                // Add to local array first so it's always visible
                allStartups.unshift(newStartup);
                filteredStartupsCache = [...allStartups];
                updateSearchStats();
                displayStartups(filteredStartupsCache);

                // Persist to localStorage
                localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));

                // Save to Supabase
                var supabase = getSupabaseClient();
                if (supabase && currentUser && currentUser.id) {
                    (async function() {
                        var saved = false;
                        var lastError = null;
                        for (var attempt = 0; attempt < 3; attempt++) {
                            try {
                                var supabaseData = {
                                    name: newStartup.name,
                                    tagline: newStartup.tagline,
                                    stage: newStartup.stage,
                                    location: newStartup.location,
                                    needed_skills: skillsArray,
                                    compensation: newStartup.compensation,
                                    required_commitment: newStartup.required_commitment,
                                    founder_name: userName,
                                    founder_email: email,
                                    founder_id: currentUser.id,
                                    team_size: 1,
                                    team: newStartup.team,
                                    created_at: newStartup.created_at
                                };
                                var result = await supabase.from('startups').insert(supabaseData).select().single();
                                if (result.error) throw result.error;
                                
                                // Update local startup with Supabase-generated ID
                                if (result.data && result.data.id) {
                                    newStartup.id = result.data.id;
                                    localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));
                                }
                                
                                saved = true;
                                console.log("[Startups] Supabase save OK, id:", result.data ? result.data.id : 'unknown');
                                showToast('"' + name + '" created and visible to everyone!', '#8AE3FF');
                                break;
                            } catch(e) {
                                lastError = e;
                                console.error("[Startups] Supabase save attempt " + (attempt+1) + " failed:", e.code, e.message, e);
                                if (attempt < 2) await new Promise(function(r) { setTimeout(r, 1000 * (attempt + 1)); });
                            }
                        }
                        if (!saved) {
                            var errorMsg = lastError ? (lastError.message || lastError.code || 'Unknown error') : 'Unknown error';
                            console.error("[Startups] All Supabase save attempts failed. Last error:", errorMsg);
                            var errToast = document.createElement('div');
                            errToast.innerHTML = '<div style="font-weight:600;margin-bottom:4px;">⚠️ Could not save to cloud</div><div style="font-size:10px;opacity:0.8;">' + errorMsg + '</div><div style="font-size:10px;margin-top:4px;opacity:0.6;">Saved locally only. Check console for details.</div>';
                            errToast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#ff6b6b;color:#fff;padding:12px 18px;border-radius:14px;font-size:11px;font-weight:500;z-index:10000;pointer-events:none;max-width:280px;text-align:center;';
                            document.body.appendChild(errToast);
                            setTimeout(function() { errToast.remove(); }, 5000);
                        }
                    })();
                } else if (!currentUser || !currentUser.id) {
                    showToast('"' + name + '" created! Sign in to share with others.', '#FFB86B');
                }
                
                modal.remove();
            };
        }
    }

    // ============================================================
    // LOAD STARTUPS FROM SUPABASE (with realtime subscription)
    // ============================================================
    async function loadStartupsFromSupabase() {
        var supabase = getSupabaseClient();

        if (!supabase) {
            console.log("[Startups] No Supabase client, using localStorage/samples");
            var savedStartups = localStorage.getItem('horizon_all_startups');
            if (savedStartups) {
                try { allStartups = JSON.parse(savedStartups); } catch(e) { allStartups = JSON.parse(JSON.stringify(SAMPLE_STARTUPS)); }
            } else {
                allStartups = JSON.parse(JSON.stringify(SAMPLE_STARTUPS));
            }
            filteredStartupsCache = [...allStartups];
            updateSearchStats();
            displayStartups(filteredStartupsCache);
            return;
        }

        // Show loading state
        var startupsList = document.getElementById('startupsList');
        if (startupsList) {
            startupsList.innerHTML = '<div style="text-align:center;padding:30px;color:#666;font-size:13px;">Loading startups...</div>';
        }

        // Safety timeout
        var loadTimeout = setTimeout(function() {
            if (!allStartups || allStartups.length === 0) {
                console.warn("[Startups] Load timeout — Supabase may be unavailable");
                var sl = document.getElementById('startupsList');
                if (sl) {
                    sl.innerHTML = '<div style="text-align:center;padding:30px;color:#ff6b6b;font-size:13px;">Unable to load startups<div style="margin-top:10px;font-size:11px;color:#888;">Check your internet connection</div><button onclick="if(window.HorizonStartups)window.HorizonStartups.init()" style="margin-top:12px;padding:8px 20px;background:linear-gradient(135deg,#8AE3FF,#FFB86B);border:none;border-radius:12px;font-size:12px;font-weight:600;cursor:pointer;color:#000;">Retry</button></div>';
                }
            }
        }, 8000);

        // Direct fetch first
        try {
            var result = await supabase.from('startups').select('*').order('created_at', { ascending: false });
            clearTimeout(loadTimeout);
            
            if (result.error) {
                // If table doesn't exist yet, that's OK — use samples
                if (result.error.code === '42P01') {
                    console.log("[Startups] Table doesn't exist yet, using samples");
                    allStartups = JSON.parse(JSON.stringify(SAMPLE_STARTUPS));
                } else {
                    throw result.error;
                }
            } else if (result.data && result.data.length > 0) {
                console.log("[Startups] Fetched " + result.data.length + " startups from Supabase");
                allStartups = result.data;
            } else {
                console.log("[Startups] No startups in Supabase, using samples");
                allStartups = JSON.parse(JSON.stringify(SAMPLE_STARTUPS));
            }
            
            localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));
            filteredStartupsCache = [...allStartups];
            updateSearchStats();
            displayStartups(filteredStartupsCache);
        } catch(fetchError) {
            clearTimeout(loadTimeout);
            console.error("[Startups] Supabase fetch failed:", fetchError);
            
            var fsDot = document.getElementById('firestoreDot');
            var fsText = document.getElementById('firestoreText');
            if (fsDot && fsText) {
                fsDot.style.background = '#ff6b6b';
                fsText.textContent = 'Error: ' + (fetchError.code || 'unknown');
            }
            
            // Fallback to localStorage
            var saved = localStorage.getItem('horizon_all_startups');
            if (saved) {
                try { allStartups = JSON.parse(saved); } catch(e) { allStartups = JSON.parse(JSON.stringify(SAMPLE_STARTUPS)); }
            } else {
                allStartups = JSON.parse(JSON.stringify(SAMPLE_STARTUPS));
            }
            filteredStartupsCache = [...allStartups];
            updateSearchStats();
            displayStartups(filteredStartupsCache);
        }

        // Set up Supabase Realtime subscription for instant cross-user visibility
        if (supabaseRealtimeChannel) {
            supabase.removeChannel(supabaseRealtimeChannel);
            supabaseRealtimeChannel = null;
        }

        try {
            supabaseRealtimeChannel = supabase
                .channel('startups-realtime')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'startups' }, function(payload) {
                    console.log("[Startups] Realtime event:", payload.eventType, payload.new, payload.old);
                    
                    if (payload.eventType === 'INSERT') {
                        // New startup added by someone else
                        var exists = false;
                        for (var i = 0; i < allStartups.length; i++) {
                            if (String(allStartups[i].id) === String(payload.new.id)) {
                                exists = true;
                                break;
                            }
                        }
                        if (!exists) {
                            allStartups.unshift(payload.new);
                            localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));
                            filteredStartupsCache = [...allStartups];
                            updateSearchStats();
                            displayStartups(filteredStartupsCache);
                        }
                    } else if (payload.eventType === 'UPDATE') {
                        for (var j = 0; j < allStartups.length; j++) {
                            if (String(allStartups[j].id) === String(payload.new.id)) {
                                allStartups[j] = payload.new;
                                break;
                            }
                        }
                        localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));
                        filteredStartupsCache = [...allStartups];
                        updateSearchStats();
                        displayStartups(filteredStartupsCache);
                    } else if (payload.eventType === 'DELETE') {
                        var oldId = payload.old ? payload.old.id : null;
                        if (oldId) {
                            var filtered = [];
                            for (var k = 0; k < allStartups.length; k++) {
                                if (String(allStartups[k].id) !== String(oldId)) {
                                    filtered.push(allStartups[k]);
                                }
                            }
                            allStartups = filtered;
                            localStorage.setItem('horizon_all_startups', JSON.stringify(allStartups));
                            filteredStartupsCache = [...allStartups];
                            updateSearchStats();
                            displayStartups(filteredStartupsCache);
                        }
                    }
                })
                .subscribe(function(status) {
                    console.log("[Startups] Realtime subscription status:", status);
                    var dot = document.getElementById('firestoreDot');
                    var txt = document.getElementById('firestoreText');
                    if (dot && txt) {
                        if (status === 'SUBSCRIBED') {
                            dot.style.background = '#34A853';
                            txt.textContent = 'Live';
                        } else if (status === 'CHANNEL_ERROR') {
                            dot.style.background = '#ff6b6b';
                            txt.textContent = 'Realtime error';
                        } else if (status === 'TIMED_OUT') {
                            dot.style.background = '#FFB86B';
                            txt.textContent = 'Reconnecting...';
                        }
                    }
                });
        } catch(subError) {
            console.error("[Startups] Realtime subscription error:", subError);
        }
    }

    // ============================================================
    // INITIALIZATION
    // ============================================================
    function initStartups() {
        injectStartupCSS();
        
        function initSearch() {
            var searchInput = document.getElementById('startupSearchInput');
            var clearBtn = document.getElementById('clearStartupSearch');
            
            if (searchInput) {
                searchInput.removeEventListener('input', searchInput._listener);
                searchInput._listener = function(e) {
                    var value = e.target.value;
                    if (clearBtn) {
                        clearBtn.style.display = value ? 'block' : 'none';
                    }
                    searchStartups(value);
                };
                searchInput.addEventListener('input', searchInput._listener);
            }
            
            if (clearBtn) {
                clearBtn.removeEventListener('click', clearBtn._listener);
                clearBtn._listener = function() {
                    clearSearch();
                };
                clearBtn.addEventListener('click', clearBtn._listener);
            }
        }
        
        function setupCreateButton() {
            var createBtn = document.getElementById('createStartupBtn');
            if (createBtn) {
                createBtn.removeEventListener('click', showCreateStartupModal);
                createBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showCreateStartupModal();
                });
            } else {
                setTimeout(setupCreateButton, 100);
            }
        }
        
        setupCreateButton();
        
        document.addEventListener('horizon:userReady', async function(e) {
            currentUser = e.detail;
            await loadStartupsFromSupabase();
            filteredStartupsCache = [...allStartups];
            updateSearchStats();
            initSearch();
            setupCreateButton();
        });
        
        // Check if user is already logged in
        if (window.HorizonAuth) {
            var existingUser = window.HorizonAuth.getCurrentUser();
            if (existingUser) {
                currentUser = existingUser;
                loadStartupsFromSupabase();
                filteredStartupsCache = [...allStartups];
                updateSearchStats();
                initSearch();
                setupCreateButton();
            } else {
                loadStartupsFromSupabase();
                setTimeout(initSearch, 200);
                setTimeout(setupCreateButton, 200);
            }
        } else {
            loadStartupsFromSupabase();
            setTimeout(initSearch, 200);
            setTimeout(setupCreateButton, 200);
        }
    }
    
    // ============================================================
    // PUBLIC API
    // ============================================================
    window.HorizonStartups = {
        init: initStartups,
        refresh: function() { loadStartupsFromSupabase(); },
        getAllStartups: function() { return allStartups; },
        createStartup: showCreateStartupModal,
        unsubscribe: function() {
            if (supabaseRealtimeChannel) {
                var supabase = getSupabaseClient();
                if (supabase) {
                    supabase.removeChannel(supabaseRealtimeChannel);
                }
                supabaseRealtimeChannel = null;
            }
        }
    };
    
})();

document.addEventListener('DOMContentLoaded', function() {
    if (window.HorizonStartups) {
        window.HorizonStartups.init();
    }
});
