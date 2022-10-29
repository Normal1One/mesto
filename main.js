(()=>{"use strict";var e={240:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{V:()=>o});var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._options=t}var t,n;return t=e,(n=[{key:"getProfileInfo",value:function(){return this._request("users/me",{method:"GET"})}},{key:"changeProfilePhoto",value:function(e){return this._request("users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:e})})}},{key:"changeProfileInfo",value:function(e,t){return this._request("users/me",{method:"PATCH",body:JSON.stringify({name:e,about:t})})}},{key:"createCard",value:function(e,t){return this._request("cards",{method:"POST",body:JSON.stringify({name:e,link:t})})}},{key:"deleteCard",value:function(e){return this._request("cards/".concat(e),{method:"DELETE"})}},{key:"likeImage",value:function(e){return this._request("cards/".concat(e,"/likes"),{method:"PUT"})}},{key:"unlikeImage",value:function(e){return this._request("cards/".concat(e,"/likes"),{method:"DELETE"})}},{key:"getInitialCards",value:function(){return this._request("cards",{method:"GET"})}},{key:"_request",value:function(e,t){return t.headers=this._options.headers,fetch("".concat(this._options.baseUrl,"/").concat(e),t).then(this._checkResponse)}},{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},578:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{Z:()=>o});var o=function(){function e(t,n,r,o,i,u){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._alt=t.name+" фото",this._likes=t.likes,this._id=t._id,this._owner=t.owner,this._userId=u,this._elementTemplate=n,this._handleCardClick=r,this._handleCardDelete=i,this._handleLike=o}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return this._elementTemplate.cloneNode(!0)}},{key:"generateCard",value:function(){var e=this;return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".element__image"),this._likeButton=this._element.querySelector(".like-button"),this._deleteButton=this._element.querySelector(".delete-button"),this._likeCountElement=this._element.querySelector(".like-count"),this._setEventListeners(),this._element.querySelector(".element__title").textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._alt,this._likeCountElement.textContent=this._likes.length,this._likes.some((function(t){return t._id===e._userId}))&&this._likeButton.classList.add("like-button_active"),this._owner._id!==this._userId&&this._deleteButton.classList.add("delete-button-disable"),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._cardImage.addEventListener("click",(function(){e._handleCardClick({name:e._name,link:e._link})})),this._likeButton.addEventListener("click",(function(){e._handleLike(e)})),this._deleteButton.addEventListener("click",(function(t){e._handleCardDelete(e,t)}))}},{key:"isLiked",value:function(){return this._likeButton.classList.contains("like-button_active")}},{key:"removeLike",value:function(e){this._likeButton.classList.remove("like-button_active"),this._likeCountElement.textContent=e.likes.length}},{key:"addLike",value:function(e){this._likeButton.classList.add("like-button_active"),this._likeCountElement.textContent=e.likes.length}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},383:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{T:()=>o});var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._submitButton=t.submitButtonSelector,this._inputError=t.inputErrorClass,this._error=t.errorClass,this._input=t.inputSelector,this._inactiveButton=t.inactiveButtonClass,this._buttonElement=n.querySelector(this._submitButton)}var t,n;return t=e,(n=[{key:"_isValid",value:function(e,t){t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,t.validationMessage)}},{key:"_showInputError",value:function(e,t,n){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.add(this._inputError),r.textContent=n,r.classList.add(this._error)}},{key:"_hideInputError",value:function(e,t){var n=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(this._inputError),n.classList.remove(this._error),n.textContent=""}},{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._input)),this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(e._formElement,t),e._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._inactiveButton),this._buttonElement.setAttribute("disabled","")):(this._buttonElement.classList.remove(this._inactiveButton),this._buttonElement.removeAttribute("disabled"))}},{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(e._formElement,t)})),this._toggleButtonState()}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},4:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{Z:()=>o});var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.bindedMethod=this._handleEscClose.bind(this),this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this.bindedMethod)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this.bindedMethod)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&e.close(),t.stopImmediatePropagation()}))}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},599:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=u(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function u(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function c(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}n.d(t,{i:()=>s});var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(f,e);var t,n,r,u,s=(r=f,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=l(r);if(u){var n=l(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return c(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=s.call(this,e))._confirmationButton=t._popup.querySelector(".delete-popup-button"),t}return t=f,(n=[{key:"setSubmitAction",value:function(e){this._submitAction=e}},{key:"setEventListeners",value:function(){var e=this;this._confirmationButton.addEventListener("click",(function(){e._submitAction()})),i(l(f.prototype),"setEventListeners",this).call(this)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n(4).Z)},1:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=u(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function u(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function c(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}n.d(t,{U:()=>s});var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(f,e);var t,n,r,u,s=(r=f,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=l(r);if(u){var n=l(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return c(this,e)});function f(e,t){var n,r=t.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(n=s.call(this,e))._handleFormSubmit=r,n._element=n._popup.querySelector(".form"),n._inputList=n._element.querySelectorAll(".form__input"),n._submitBtn=n._popup.querySelector(".popup__button"),n._submitBtnText=n._submitBtn.textContent,n}return t=f,n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"renderLoading",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";this._submitBtn.textContent=e?t:this._submitBtnText}},{key:"setEventListeners",value:function(e){var t=this;this._element.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit(t._getInputValues())})),i(l(f.prototype),"setEventListeners",this).call(this)}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"close",value:function(){i(l(f.prototype),"close",this).call(this),this._element.reset()}}],n&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n(4).Z)},584:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(){return i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=u(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},i.apply(this,arguments)}function u(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=l(e)););return e}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function c(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}n.d(t,{l:()=>s});var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(f,e);var t,n,r,u,s=(r=f,u=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=l(r);if(u){var n=l(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return c(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=s.call(this,e)).popupImage=t._popup.querySelector(".popup__image"),t.popupImageTitle=t._popup.querySelector(".popup__image-title"),t}return t=f,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;this.popupImageTitle.textContent=t,this.popupImage.src=n,this.popupImage.alt=t+" фото",i(l(f.prototype),"open",this).call(this)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n(4).Z)},411:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{$:()=>o});var o=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){var t=this._renderer(e);this._container.append(t)}},{key:"prependItem",value:function(e){var t=this._renderer(e);this._container.prepend(t)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t.addItem(e)}))}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},840:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{a:()=>o});var o=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._infoElement=document.querySelector(n),this._nameElement=document.querySelector(t),this._avatarElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,info:this._infoElement.textContent,avatar:this._avatarElement.textContent,_id:this._userId}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.avatar,o=e._id;this._infoElement.textContent=n,this._nameElement.textContent=t,this._avatarElement.src=r,this._userId=o}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},627:(e,t,n)=>{var r=n(578),o=n(383),i=n(584),u=n(599),a=n(411),c=n(1),l=n(840),s=n(240),f=n(674);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h=new u.i("#popup-delete"),d=new i.l("#popup-image"),y=new s.V({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-52",headers:{authorization:"fec95476-65d9-4fdf-85cc-c952cc17e6d7","Content-Type":"application/json"}}),m=new l.a(".profile__info-name",".profile__info-job",".profile__avatar"),_=new a.$({renderer:function(e){return new r.Z(e,f.Dr,v,b,g,m._userId).generateCard()}},".elements");Promise.all([y.getProfileInfo(),y.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];m.setUserInfo(o),_.renderItems(i)})).catch((function(e){console.log(e)}));var v=function(e){d.open(e)};function b(e){var t;e.isLiked()?(t=e,y.unlikeImage(t._id).then((function(e){t.removeLike(e)})).catch((function(e){console.log(e)}))):function(e){y.likeImage(e._id).then((function(t){e.addLike(t)})).catch((function(e){console.log(e)}))}(e)}function g(e,t){h.open(),h.setSubmitAction((function(){y.deleteCard(e._id).then((function(){t.target.closest(".element").remove()})).then((function(){h.close()})).catch((function(e){console.log(e)}))}))}var k,E=new c.U("#popup-avatar",{handleFormSubmit:function(e){E.renderLoading(!0),y.changeProfilePhoto(e.link).then((function(e){m.setUserInfo(e)})).then((function(){E.close()})).catch((function(e){console.log(e)})).finally((function(){E.renderLoading(!1)}))}}),w=new c.U("#popup-edit",{handleFormSubmit:function(e){w.renderLoading(!0),y.changeProfileInfo(e.name,e.info).then((function(e){m.setUserInfo(e)})).then((function(){w.close()})).catch((function(e){console.log(e)})).finally((function(){w.renderLoading(!1)}))}}),O=new c.U("#popup-add",{handleFormSubmit:function(e){O.renderLoading(!0),y.createCard(e.name,e.link).then((function(e){_.prependItem(e)})).then((function(){O.close()})).catch((function(e){console.log(e)})).finally((function(){O.renderLoading(!1)}))}}),S={};k=f.vc,Array.from(document.querySelectorAll(k.formSelector)).forEach((function(e){var t=new o.T(k,e),n=e.getAttribute("id");S[n]=t,t.enableValidation()})),f.H2.addEventListener("click",(function(){S["add-element"].resetValidation(),O.open()})),f.dC.addEventListener("click",(function(){var e=m.getUserInfo();w.setInputValues(e),S["edit-profile"].resetValidation(),w.open()})),f.Yf.addEventListener("click",(function(){S["edit-avatar"].resetValidation(),E.open()})),h.setEventListeners(),E.setEventListeners(),w.setEventListeners(),O.setEventListeners(),d.setEventListeners()},674:(e,t,n)=>{n.d(t,{Dr:()=>o,H2:()=>u,Yf:()=>a,dC:()=>i,vc:()=>r});var r={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__error_visible"},o=document.querySelector(".element-template").content,i=document.querySelector(".profile__edit-button"),u=document.querySelector(".profile__add-button"),a=document.querySelector(".profile__avatar-content")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(674),n(627),n(383),n(578),n(599),n(1),n(584),n(4),n(411),n(840),n(240)})();