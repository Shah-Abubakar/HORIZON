// ============================================================
// HORIZON SMART DISCOVERY ALGORITHM
// ============================================================

class HorizonDiscovery {
    constructor(userId) {
        this.userId = userId;
        this.interestVector = this.loadInterestVector();
        this.actionHistory = this.loadActionHistory();
    }

    loadInterestVector() {
        const saved = localStorage.getItem(`horizon_interests_${this.userId}`);
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            developer: 0.5,
            designer: 0.5,
            marketer: 0.5,
            business: 0.5,
            buildPost: 0.5,
            collabPost: 0.5,
            questionPost: 0.5,
            opportunity: 0.5,
            idea: 0.5,
            mvp: 0.5,
            launched: 0.5,
            revenue: 0.5,
            sameCollege: 0.7,
            sameCity: 0.5,
            remote: 0.5
        };
    }

    saveInterestVector() {
        localStorage.setItem(`horizon_interests_${this.userId}`, JSON.stringify(this.interestVector));
    }

    loadActionHistory() {
        const saved = localStorage.getItem(`horizon_actions_${this.userId}`);
        return saved ? JSON.parse(saved) : [];
    }

    saveAction(action) {
        this.actionHistory.unshift({
            ...action,
            timestamp: Date.now()
        });
        if (this.actionHistory.length > 500) {
            this.actionHistory.pop();
        }
        localStorage.setItem(`horizon_actions_${this.userId}`, JSON.stringify(this.actionHistory));
    }

    recordInteraction(itemType, itemCategory, action, timeSpent = 0) {
        let delta = 0;
        
        switch(action) {
            case 'connect':
            case 'like':
                delta = 0.15;
                break;
            case 'view_long':
                delta = 0.08;
                break;
            case 'view':
                delta = 0.03;
                break;
            case 'ignore':
                delta = -0.05;
                break;
            case 'report':
                delta = -0.2;
                break;
        }
        
        if (this.interestVector[itemCategory] !== undefined) {
            this.interestVector[itemCategory] = Math.max(0, Math.min(1, 
                this.interestVector[itemCategory] + delta
            ));
        }
        
        this.saveAction({
            itemType,
            itemCategory,
            action,
            timeSpent
        });
        
        this.saveInterestVector();
        
        if (action !== 'view') {
            this.reRankFeed();
        }
    }

    calculateComplementScore(user, candidate) {
        let score = 50;
        
        if (user.lookingFor === 'Find co-founder') {
            if (candidate.primarySkill === 'Developer' && user.needsTech) score += 30;
            if (candidate.primarySkill === 'Designer' && user.needsDesign) score += 25;
            if (candidate.primarySkill === 'Marketing' && user.needsMarketing) score += 25;
            if (candidate.primarySkill === 'Business' && user.needsBusiness) score += 25;
        }
        
        if (candidate.lookingFor === 'Find co-founder') {
            if (user.primarySkill === 'Developer' && candidate.needsTech) score += 30;
            if (user.primarySkill === 'Designer' && candidate.needsDesign) score += 25;
            if (user.primarySkill === 'Marketing' && candidate.needsMarketing) score += 25;
            if (user.primarySkill === 'Business' && candidate.needsBusiness) score += 25;
        }
        
        const perfectPairs = {
            'Developer': 'Business',
            'Business': 'Developer',
            'Designer': 'Developer',
            'Developer': 'Designer'
        };
        
        if (perfectPairs[user.primarySkill] === candidate.primarySkill) {
            score += 40;
        }
        
        return Math.min(100, score);
    }

    calculateIntentScore(user, candidate) {
        let score = 50;
        
        if (user.lookingFor === candidate.lookingFor) {
            score += 30;
        }
        
        if (user.lookingFor === 'Find co-founder' && candidate.lookingFor === 'Find co-founder') {
            score += 20;
        }
        if (user.lookingFor === 'Join startup' && candidate.lookingFor === 'Recruit members') {
            score += 40;
        }
        if (user.lookingFor === 'Recruit members' && candidate.lookingFor === 'Join startup') {
            score += 40;
        }
        
        return Math.min(100, score);
    }

    calculateStageScore(user, candidate) {
        let score = 40;
        
        if (user.startupStage === candidate.startupStage) {
            score += 30;
        }
        
        const compatible = {
            'Just an idea': ['Building MVP'],
            'Building MVP': ['Just an idea', 'Launched'],
            'Launched': ['Building MVP', 'Revenue'],
            'Revenue': ['Launched'],
            'Not started': ['Just an idea']
        };
        
        if (compatible[user.startupStage]?.includes(candidate.startupStage)) {
            score += 25;
        }
        
        return Math.min(100, score);
    }

    calculateProximityScore(user, candidate) {
        let score = 40;
        
        if (user.college && candidate.college && user.college === candidate.college) {
            score += 45;
        } else if (user.city && candidate.city && user.city === candidate.city) {
            score += 30;
        }
        
        if (user.prefersRemote && candidate.prefersRemote) {
            score += 10;
        }
        
        return Math.min(100, score);
    }

    calculateMatchScore(currentUser, candidate) {
        let score = 0;
        const reasons = [];
        
        const complementScore = this.calculateComplementScore(currentUser, candidate);
        score += complementScore * 0.40;
        if (complementScore > 70) {
            reasons.push(`🎯 You need a ${candidate.primarySkill} — and that's exactly what they are!`);
        }
        
        const intentScore = this.calculateIntentScore(currentUser, candidate);
        score += intentScore * 0.25;
        if (intentScore > 80) {
            reasons.push(`🤝 Both looking for the same thing — great energy!`);
        }
        
        const stageScore = this.calculateStageScore(currentUser, candidate);
        score += stageScore * 0.20;
        if (stageScore > 70) {
            reasons.push(`⚡ Both at ${currentUser.startupStage} stage — you understand each other's journey`);
        }
        
        const proximityScore = this.calculateProximityScore(currentUser, candidate);
        score += proximityScore * 0.15;
        if (proximityScore > 80) {
            reasons.push(`🏫 Same college — you can meet on campus!`);
        } else if (proximityScore > 60) {
            reasons.push(`📍 Same city — opportunities for in-person meetups`);
        }
        
        return {
            score: Math.round(score),
            reasons: reasons.slice(0, 2),
            breakdown: {
                complement: complementScore,
                intent: intentScore,
                stage: stageScore,
                proximity: proximityScore
            }
        };
    }

    getPersonalizedMatches(currentUser, candidates, limit = 20) {
        const scored = candidates.map(candidate => {
            const matchResult = this.calculateMatchScore(currentUser, candidate);
            return {
                ...candidate,
                matchScore: matchResult.score,
                matchReasons: matchResult.reasons,
                primaryReason: matchResult.reasons[0] || 'Based on your skills and goals',
                matchBreakdown: matchResult.breakdown
            };
        });
        
        scored.sort((a, b) => b.matchScore - a.matchScore);
        
        return scored.slice(0, limit);
    }

    reRankFeed() {
        const event = new CustomEvent('horizon:feedUpdate', {
            detail: { userId: this.userId }
        });
        window.dispatchEvent(event);
    }

    getSmartFilters() {
        const suggestions = [];
        
        if (this.interestVector.developer > 0.7) {
            suggestions.push({ filter: 'Developer', reason: 'You engage with developers a lot' });
        }
        if (this.interestVector.designer > 0.7) {
            suggestions.push({ filter: 'Designer', reason: 'You\'ve shown interest in design' });
        }
        
        const recentIgnores = this.actionHistory.filter(a => a.action === 'ignore').slice(0, 10);
        const ignoredSkills = [...new Set(recentIgnores.map(a => a.itemCategory))];
        
        return {
            suggested: suggestions,
            avoid: ignoredSkills
        };
    }
}

// ============================================================
// EXPORT FOR USE IN INDEX.HTML
// ============================================================

window.HorizonDiscovery = HorizonDiscovery;

window.initHorizonDiscovery = function(userId) {
    const discovery = new HorizonDiscovery(userId);
    window.currentDiscovery = discovery;
    return discovery;
};

console.log('Horizon Discovery Algorithm Loaded! 🧠');