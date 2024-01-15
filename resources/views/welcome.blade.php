#content {
  padding: 10px;
}
.video_home {
  padding-top: 0 !important;
}
.container {
  max-width: 1200px !important;
}
.noticeRed{
color: red;
}
.container1 {
  width: auto;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.d-flex1 {
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
  border-radius: 0 0 5px 5px;
  padding: 25px;
}
.formOrder {
  flex: 4;
}
.title1 {
  background: #f0f038;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  color: #f6f6f6;
}

.texth2 {
  margin: 0;
  padding-left: 15px;
  font-size: 30px;
  font-weight: 800;
  color: black;
  text-align: center;
}

.required {
  color: red;
}

.labelOrder {
  display: block;
  margin: 15px;
}

.labelOrder > span {
  float: none;
  width: 25%;
  margin-top: 12px;
  padding-right: 10px;
}

.spanDiaChi {
  float: none;
  width: 25%;
  margin-top: 12px;
  padding-right: 10px;
}

.inputText,
.inputTel,
.inputEmail,
.inputDate,
.selectDistrict {
  width: 70%;
  height: 20px;
  padding: 5px 10px;
  margin-bottom: 0;
  border: 1px solid #dadada;
  color: #888;
}

.inputDate {
  width: 20%;
}

.buttonItem {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid #f0f038;
  border-radius: 30px;
  color: #f0f038;
  font-size: 15px;
  font-weight: bold;
}

.buttonItem:hover {
  cursor: pointer;
  background: #f0f038;
  color: white;
}

.colOrder {
  display: flex;
  align-items: center;
}

.colOrder > select {
  width: 100%;
  height: 40px;
}

#dateCont {
  margin-bottom: 10px;
}

#diaChiCont {
  width: 300%;
}
/* start reponsive */
button[type="submit"] {
  background-color: white;
}
button[type="submit"]:hover {
  background-color: #f0f038;
  color: white;
}

#wpdcom .wc_email-wrapper {
  display: none !important;
}

/* css cmt  */
/* comment  */
.avatarCmtNew {
  display: flex;
  background-color: rgb(212, 212, 212);
  border-radius: 30px 0px 0px 30px;
  align-items: center;
}
.comment_parent {
  background-color: #f1f1f1;
  margin-left: 40px;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
}
.imgCmtNew {
  margin-left: 40px;
  padding: 10px;
}
.button-repD-flex {
  display: flex;
  justify-content: end;
}
.awnser_commentNew {
  background-color: #f1f1f1;
  margin-left: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
}
.avatarNew {
  border: 1px solid rgb(212, 212, 212);
  padding: 10px 15px;
  border-radius: 50%;
  color: black;
  background-color: #00b38f;
}
.formCmtNew {
  padding: 0;
  margin: 0;
  font-size: 1.1rem;
  grid-area: bottom;
  width: 100%;
}
.headCmtFormNew {
  margin-bottom: 5px;
  font-size: 16px;
  color: gray;
  font-weight: 500;
}
.infoCmtNew {
  margin: auto;
}
.gridCmtNew {
  display: grid;
  grid-template-columns: auto auto;
}
.grid-item-cmtNew {
  position: relative;
  text-align: center;
}
.grid-item-cmtNew > label {
  display: block;
}
.grid-item-cmtNew > input[type="number"]::-webkit-inner-spin-button,
.grid-item-cmtNew > input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.form-controlFixNew {
  display: block;
  width: 90% !important;
  margin: auto !important;
  height: calc(1.5em + 0.75rem + 2px) !important;
  font-size: 1rem !important;
  font-weight: 400;
  line-height: 1.5;
  color: #495057 !important;
  background-color: #fff !important;
  background-clip: padding-box;
  border: 1px solid #ced4da !important;
  border-radius: 0.25rem !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
  padding-left: 10px !important;
}
.form-controlFixNew:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
}
.labelFieldNew {
  position: absolute;
  top: 10%;
  left: 25px;
  z-index: 10;
  color: black;
  font-size: 16px;
  pointer-events: none;
  transition: 0.25s ease;
}
.form-controlFixNew:not(:placeholder-shown) + .labelFieldNew,
.form-controlFixNew:focus + .labelFieldNew {
  top: -20px;
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  background-color: #fff;
  color: #80bdff;
}
.textarea-cmtNew {
  position: relative;
  margin-top: 15px;
color: black;
}
.form-controlFixTextareaNew {
  display: block;
  width: 95%;
  margin: auto !important;
  height: calc(1.5em + 0.75rem + 2px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding-left: 10px;
  resize: none;
}
.form-controlFixTextareaNew:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
}
.labelFieldTextareaNew {
  position: absolute;
  top: 25%;
  left: 25px;
  z-index: 10;
  color: grey;
  font-size: 16px;
  pointer-events: none;
  transition: 0.25s ease;
}
.form-controlFixTextareaNew:not(:placeholder-shown) + .labelFieldTextareaNew,
.form-controlFixTextareaNew:focus + .labelFieldTextareaNew {
  top: -10px;
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  background-color: #fff;
  color: #80bdff;
}
.formBtnCmtNew {
  text-align: right;
  margin-top: 10px;
  margin-right: 15px;
}
.formBtn-CmtNew {
  color: #fcb900 !important;
  border: 2px solid #fcb900;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  padding: 0px 10px;
}
.formBtn-CmtNew:hover {
  background-color: #fcb900 !important;
  color: black !important;
  border: 2px solid #fcb900;
}
.divContentCmtNew {
  /* border: 1px solid grey; */
  border-radius: 5px;
  padding: 0px 10px;
  display: none;
  justify-content: space-between;
}
.pContentCmtNew {
  padding: 5px;
}
.commentsCmtNew {
  display: block;
  margin-left: 15px;
}

.containerCmtNew > li {
  list-style: none;
}
.cmtUlNew {
  border-left: 1px solid grey;
  padding-left: 15px;
  margin-bottom: 5px;
}
.cmtUlNew li{
list-style: none;
}
.answerNew {
  margin-top: 10px;
  border-left: 1px solid #00b38f;
  padding-left: 15px;
}
.aContentCmtNew {
  text-decoration: none;
}

.clearfixCmtNew {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0px 10px;
}
/* commentCard */
.containerCmtNew::-webkit-scrollbar-thumb {
  background: #f0f038;
  border-radius: 10px;
  background-color: #fef84c;
}
.containerCmtNew {
  height: 700px;
  overflow-y: scroll;
}
.containerCmtNew::-webkit-scrollbar {
  width: 5px;
}
.commentCardNew {
  border-left: 2px solid grey;
  border-radius: 0 0 0 50px;
  padding: 15px;
}
.footerContentCmtNew {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.nameTitleNew {
  color: grey;
  margin: 0px;
}
.pContentCmtNew {
  margin-bottom: 5px;
}
.footerContentCmtNew a {
  text-decoration: none;
  color: #ffd100;
  border: 1px solid #ffd100;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  margin-bottom: 10px;
  text-align: center;
}

.footerContentCmtNew .showReplyNew:hover {
  border: none;
  background-color: #ffd100;
  text-decoration: none;
  color: black;
  border: 1px solid #ffd100;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  margin-bottom: 10px;
  text-align: center;
}
.footerContentCmtNew .showCommentNew {
  border: none;
  color: grey;
}
.footerContentCmtNew .showCommentNew:hover {
  border: none;
  color: black;
  background-color: none;
}
.comment_infoNew {
  color: #00b38f;
  padding-left: 15px;
  width: 100%;
}

.imgUploadNew {
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
}
.imgUpLeftNew {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column-reverse;
}
.imgUpLeftNew > label {
  background-color: grey;
  text-align: center;
  width: 50%;
  margin: auto;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}
.imgUpRightNew {
  margin-right: 25px;
}
.previewNew {
  background-color: #dbdbdb;
  border-radius: 10px;
  text-align: center;
}
.previewNew > ol > li > img {
  width: 100px;
  height: 100px;
  padding-top: 10px;
}

.previewNew > ol {
  padding-left: 0;
}
.previewNew > ol > li {
  list-style: none;
}

@media (min-width: 1200px) {
  .container1 {
      max-width: 1140px;
  }
}
@media only screen and (min-width: 1024px) {
  .labelFieldNew {
      left: 45px;
  }
  .labelFieldTextareaNew {
      left: 45px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .spanDiaChi {
      float: none !important;
      width: 100%;
      margin-top: 12px;
      padding-right: 10px;
  }
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width: 768px) {
  /* Styles */
  .labelOrder > span {
      width: 100%;
      margin-bottom: 10px;
  }

  .spanDiaChi {
      float: none !important;
  }

  .colOrder > select {
      width: 100%;
      margin-right: 0;
      height: 40px;
  }

  .inputText,
  .inputTel,
  .inputEmail,
  .inputDate,
  .selectDistrict {
      width: 100%;
  }

  .labelOrder > span {
      width: 100%;
      margin-bottom: 10px;
      display: block;
  }

  .d-flex1 {
      padding-left: 5px;
  }
}
@media only screen and (max-width: 700px) {
  .imgUploadNew {
      grid-template-columns: auto;
  }
  .imgUpLeftNew {
      margin-bottom: 5px;
  }
}
/* popup */
.overlayNew {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
  z-index: 12;
}
.overlayNew:target {
  visibility: visible;
  opacity: 1;
}

/* button phan hoi  */
.btn-replayNew {
  border-radius: 10px;
  border: 1px solid orange;
  background-color: white;
  color: orange;
  cursor: pointer;
  padding: 0px 10px;
  margin-top: 3px;
  font-size: 10px !important;
}
.btn-replayNew:hover {
  background-color: #fcb900;
  color: white;
  border: 1px solid orange;
}

.girdContentCmt {
  display: flex;
  justify-content: space-between;
}
.dataCmtNew {
  color: grey;
  font-style: italic;
  font-size: 13px;
}
.btnFeedBack {
  background-color: white;
  border: 1px solid #f19d00;
  color: #f19d00;
  border-radius: 5px;
  padding: 5px 20px;
}
.mobile-nav>.search-form, .sidebar-menu .search-form {
  padding: 5px 0;
  width: 300px;
  float: right;
}
.search-form {
  width: 100%;
}
.form-flat input:not([type=submit]) {
   background-color: #fff; 
}