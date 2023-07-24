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
        case 'update_context':
            return {
                ...state,
                context: true,
                contextID: action.contextID,
                contextLoc: action.contextLoc,
                contextType: action.contextType
            }
        case 'update_contextMenu':
            return {
                ...state,
                context: false
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
        case 'update_userContext':
            return {
                ...state,
                userContext: true,
                contextID: action.contextID,
                contextLoc: action.contextLoc,
                contextType: action.contextType
            }
        case 'update_userContextMenu':
            return {
                ...state,
                userContext: false
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
    context: false,
    contextID: '',
    contextType: ['empty', 0, 100, 'no date'],
    contextLoc: [0, 0],
    preview: false,
    previewLink: '/',
    users: [],
    userContext: false,
    progress: 0,
    uploading: false
}