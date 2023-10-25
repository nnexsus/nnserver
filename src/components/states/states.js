export const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state
        case 'update_message':
            return {
                ...state,
                toaster: true,
                message: action.message,
                progress: 0,
                uploading: false
            }
        case 'update_toaster':
            return {
                ...state,
                toaster: action.toaster
            }
        case 'update_previewLink':
            return {
                ...state,
                previewLink: action.previewLink,
                preview: true
            }
        case 'update_preview':
            return {
                ...state,
                preview: action.preview
            }
        case 'update_users':
            return {
                ...state,
                users: action.users
            }
        case 'update_progress':
            return {
                ...state,
                progress: action.progress,
            }
        case 'start_upload':
            return {
                ...state,
                toaster: true,
                message: "Uploading...",
                progress: 0,
                uploading: true
            }
    }
}

export const initState = {
    toaster: false,
    message: "",
    preview: false,
    previewLink: '/',
    users: [],
    progress: 0,
    uploading: false
}