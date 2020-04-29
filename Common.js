        /*
         * @param {any}
         * @returns {boolean}
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
        }
