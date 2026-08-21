export const ROLE_PERMISSIONS = {
    CITY_ADMIN: {
        viewIssues: true,
        assignIssues: true,
        updateIssues: true,
        resolveIssues: true,
        manageCitizens: true,
        viewAnalytics: true,
        manageUsers: true,
    },

    DEPARTMENT_HEAD: {
        viewIssues: true,
        assignIssues: true,
        updateIssues: true,
        resolveIssues: true,
        manageCitizens: false,
        viewAnalytics: true,
        manageUsers: false,
    },

    FIELD_OFFICER: {
        viewIssues: true,
        assignIssues: false,
        updateIssues: true,
        resolveIssues: true,
        manageCitizens: false,
        viewAnalytics: false,
        manageUsers: false,
    },
};

export const getPermissionsForRole = (role) => {
    return ROLE_PERMISSIONS[role] || null;
};