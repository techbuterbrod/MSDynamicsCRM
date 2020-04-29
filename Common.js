var Common = {
    Const: {
        SubmitMode: {
            Always: "always",
            Never: "never",
            Dirty: "dirty"
        },
        FormType: {
            CREATE: 1,
            UPDATE: 2,
            READ_ONLY: 3,
            DISABLED: 4,
            QUICK_CREATE: 5,
            BULK_EDIT: 6
        }
    },
    Extensions: {
        /**
         * Проверка на Ответственного
         * @param {any} currentUserId Id текущего Пользователя
         * @returns {boolean} Возвращает true или false
         */
        isCurrentUserOwner: function (currentUserId) {
            let owner = Xrm.Page.getAttribute("ownerid");
            if (owner && owner.getValue()) {
                let ownerId = owner.getValue()[0].id.replace("{", "").replace("}", "").toLowerCase();
                if (ownerId == currentUserId) {
                    return true;
                }
            }
            return false;
        },
        setState: function (stateCode, statusCode, progressIndicatorMessage) {
            let requestName = "gbc_SetState";

            let entityId = Xrm.Page.data.entity.getId();
            let entityName = Xrm.Page.data.entity.getEntityName();
            if (!entityId) {
                Common.Extensions.exceptionBanner("Произошла ошибка. Обратитесь к Администратору!");
                Common.Extensions.writeToConsoleError(entityId);
            }
            if (!entityName) {
                Common.Extensions.exceptionBanner("Произошла ошибка. Обратитесь к Администратору!");
                Common.Extensions.writeToConsoleError(entityName);
            }
            let parameters = {
                "EntityId": entityId,
                "EntityName": entityName,
                "StateCode": String(stateCode),
                "StatusCode": String(statusCode)
            };
            var message = "Обработка запроса...";
            if (progressIndicatorMessage)
                message = progressIndicatorMessage;
            Xrm.Utility.showProgressIndicator(message);
            Xrm.Utility.invokeProcessAction(requestName, parameters)
                .then(
                    function () {
                        Xrm.Utility.closeProgressIndicator();
                        Xrm.Page.data.refresh();

                    }, function (error) {
                        Xrm.Utility.closeProgressIndicator();
                        Common.Extensions.exceptionBanner("Произошла ошибка. Обратитесь к Администратору!");
                        Common.Extensions.writeToConsoleError(error);
                        Xrm.Page.data.refresh();
                    }
                )
        }
    }
};
