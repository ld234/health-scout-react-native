import axios from 'axios';
import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const SEND_DOCUMENT_PENDING = 'SEND_DOCUMENT_PENDING';
export const SEND_DOCUMENT_SUCCESS = 'SEND_DOCUMENT_SUCCESS';
export const SEND_DOCUMENT_ERROR = 'SEND_DOCUMENT_ERROR';
export const GET_RECEIVED_DOCS_PENDING = 'GET_RECEIVED_DOCS_PENDING';
export const GET_RECEIVED_DOCS_SUCCESS = 'GET_RECEIVED_DOCS_SUCCESS';
export const GET_RECEIVED_DOCS_ERROR = 'GET_RECEIVED_DOCS_ERROR';
export const GET_SENT_DOCUMENTS_PENDING = 'GET_SENT_DOCUMENTS_PENDING';
export const GET_SENT_DOCUMENTS_SUCCESS = 'GET_SENT_DOCUMENTS_SUCCESS';
export const GET_SENT_DOCUMENTS_ERROR = 'GET_SENT_DOCUMENTS_ERROR';

const ROOT_URL = 'http://10.0.2.2:8888/clients/profile/exchangeDocument/patient';
const ROOT_URL2 = 'https://10.0.2.2:9000/clients/profile/exchangeDocument/upload';

function setSendDocumentPending(isSendDocumentPending) {
	return {
		type: SEND_DOCUMENT_PENDING,
		isSendDocumentPending: isSendDocumentPending,
	};
}

function setSendDocumentSuccess(isSendDocumentSuccess, justSendIdx) {
	return {
		type: SEND_DOCUMENT_SUCCESS,
		isSendDocumentSuccess: isSendDocumentSuccess,
		justSendIdx,
	};
}

function setSendDocumentError(sendDocumentError) {
	return {
		type: SEND_DOCUMENT_ERROR,
		sendDocumentError: sendDocumentError,
	};
}

export function sendDocument(formdata) {
	return dispatch => {
		dispatch(setSendDocumentPending(true));
		dispatch(setSendDocumentSuccess(false));
		dispatch(setSendDocumentError(null));
		AsyncStorage.getItem('id_token').then(res => {
			RNFetchBlob.config({
				trusty : true
			}).fetch('POST', ROOT_URL2, {
				'x-access-token': res,
				'Content-Type' : 'multipart/form-data',
			}, [
				{ name : 'file', filename : formdata.filename, type:'application/pdf', data: RNFetchBlob.wrap(formdata.file)},
				{ name : 'pracUsername', data : formdata.pracUsername },
				{ name : 'title', data : formdata.title },
			]).then((resp) => {
				setTimeout(() => dispatch(setSendDocumentPending(false)), 1000);
				dispatch(setSendDocumentSuccess(true, formdata.justSendIdx));
			}).catch((err) => {
				dispatch(setSendDocumentPending(false));
				dispatch(setSendDocumentSuccess(false, null));
				if (err.response && err.response.data) dispatch(setSendDocumentError(err.response.data.message));
			})
		}).catch(err => console.log('async storage err', err));
	};
}

function setGetReceivedDocsPending(isGetReceivedDocsPending) {
	return {
		type: GET_RECEIVED_DOCS_PENDING,
		isGetReceivedDocsPending: isGetReceivedDocsPending,
	};
}

function setGetReceivedDocsSuccess(isGetReceivedDocsSuccess, receivedDocs) {
	return {
		type: GET_RECEIVED_DOCS_SUCCESS,
		isGetReceivedDocsSuccess: isGetReceivedDocsSuccess,
		receivedDocs,
	};
}

function setGetReceivedDocsError(getReceivedDocsError) {
	return {
		type: GET_RECEIVED_DOCS_ERROR,
		getReceivedDocsError: getReceivedDocsError,
	};
}

export function getReceivedDocuments() {
	return dispatch => {
		dispatch(setGetReceivedDocsPending(true));
		dispatch(setGetReceivedDocsSuccess(false));
		dispatch(setGetReceivedDocsError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
                    setTimeout(() => dispatch(setGetReceivedDocsPending(false)), 1000);
					dispatch(setGetReceivedDocsSuccess(true, res.data));
				})
				.catch(err => {
					dispatch(setGetReceivedDocsPending(false));
					dispatch(setGetReceivedDocsSuccess(false, null));
					if (err.response && err.response.data) dispatch(setGetReceivedDocsError(err.response.data.message));
				});
		})
	};
}

function setGetSentDocumentsPending(isGetSentDocumentsPending) {
	return {
		type: GET_SENT_DOCUMENTS_PENDING,
		isGetSentDocumentsPending: isGetSentDocumentsPending,
	};
}

function setGetSentDocumentsSuccess(isGetSentDocumentsSuccess, sentDocuments) {
	return {
		type: GET_SENT_DOCUMENTS_SUCCESS,
		isGetSentDocumentsSuccess: isGetSentDocumentsSuccess,
        sentDocuments,
	};
}

function setGetSentDocumentsError(getSentDocumentsError) {
	return {
		type: GET_SENT_DOCUMENTS_ERROR,
		getSentDocumentsError: getSentDocumentsError,
	};
}

export function getSentDocuments(med,cb, idx) {
	return dispatch => {
		dispatch(setGetSentDocumentsPending(true));
		dispatch(setGetSentDocumentsSuccess(false, null));
		dispatch(setGetSentDocumentsError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.delete(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
                    },
                    params: med,
				})
				.then(res => {
					dispatch(setGetSentDocumentsPending(false));
                    dispatch(setGetSentDocumentsSuccess(true, res.data));
                    cb();
				})
				.catch(err => {
					dispatch(setGetSentDocumentsPending(false));
					dispatch(setGetSentDocumentsSuccess(false, null));
					if (err.response && err.response.data) dispatch(setGetSentDocumentsError(err.response.data.message));
				});
		})
	};
}