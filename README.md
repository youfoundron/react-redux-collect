# React Redux Collect
This is the consequence of some feedback and meditation on [react-redux-connect-helpers](https://github.com/rongierlach/react-redux-connect-helpers).  
Chiefly, the resulting nested mess of connectors after composition:

![screen shot 2017-04-08 at 3 01 55 pm](https://cloud.githubusercontent.com/assets/4658359/24832048/0342a57a-1c6d-11e7-8462-aab689054e54.png)  
*screenshot from [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)*

redux-collect implements the same core functionality as react-redux-connect-helper's `connectStateValue`, but by buildling up `mapStateToProps` and `mapDispatchToProps` arguments to be passed to a _single_ [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) call.
