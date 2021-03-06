/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for get send documents, recieved documents, and send documents to practitioner
 * Created:  9 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { GET_SENT_DOCUMENTS_PENDING, 
	GET_SENT_DOCUMENTS_SUCCESS, 
	GET_SENT_DOCUMENTS_ERROR,
    GET_RECEIVED_DOCS_PENDING,
    GET_RECEIVED_DOCS_SUCCESS,
    GET_RECEIVED_DOCS_ERROR,
    SEND_DOCUMENT_PENDING,
    SEND_DOCUMENT_SUCCESS,
    SEND_DOCUMENT_ERROR } from '../actions/document.actions';

const INITIAL_STATE = {
    isGetReceivedDocsPending: false,
	isGetReceivedDocsSuccess: false,
    getReceivedDocsError: null,
	receivedDocs: [],
	sentDocuments:[],
    isGetSentDocumentsPending: false,
	isGetSentDocumentsSuccess: false,
    getSentDocumentsError: null,
    isSendDocumentPending: false,
	isSendDocumentSuccess: false,
    sendDocumentError: null,
    justSendIdx: -1,
}

export default function docReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
		case GET_RECEIVED_DOCS_PENDING:
			return {
				...state,
				isGetReceivedDocsPending: action.isGetReceivedDocsPending,
			};
		case GET_RECEIVED_DOCS_SUCCESS:
			return {
				...state,
				isGetReceivedDocsSuccess: action.isGetReceivedDocsSuccess,
				receivedDocs: action.receivedDocs && action.receivedDocs.length? action.receivedDocs : state.receivedDocs,
			};
		case GET_RECEIVED_DOCS_ERROR:
			return {
				...state,
				getReceivedDocsError: action.getReceivedDocsError,
            };
        case GET_SENT_DOCUMENTS_PENDING:
			return {
				...state,
				isAddReceivedDocsPending: action.isGetSentDocumentsPending,
			};
		case GET_SENT_DOCUMENTS_SUCCESS:
			return {
				...state,
				isGetSentDocumentsSuccess: action.isGetSentDocumentsSuccess,
				sentDocuments: action.sentDocuments && action.sentDocuments.length?  action.sentDocuments : state.sentDocuments,
			};
		case GET_SENT_DOCUMENTS_ERROR:
			return {
				...state,
				getSentDocumentsError: action.getSentDocumentsError,
            };
        case SEND_DOCUMENT_PENDING:
			return {
				...state,
				isSendDocumentPending: action.isSendDocumentPending,
			};
		case SEND_DOCUMENT_SUCCESS:
			return {
				...state,
				isSendDocumentSuccess: action.isSendDocumentSuccess,
				justSendIdx: action.justSendIdx,
				receivedDocs: Number.isInteger(action.justSendIdx) ? 
					state.receivedDocs.filter((item, idx) => idx !== action.justSendIdx): 
					state.receivedDocs,
				sentDocuments: action.newSentDoc ? [...state.sentDocuments, action.newSentDoc] : state.sentDocuments, 
			};
		case SEND_DOCUMENT_ERROR:
			return {
				...state,
				sendDocumentError: action.sendDocumentError,
			};
		default:
			return state;
	}
}