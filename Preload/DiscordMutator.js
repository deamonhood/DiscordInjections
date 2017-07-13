module.exports = (Discord) => {
    Object.defineProperty(Discord.Client.prototype, 'selectedGuild', {
        get: function () {
            return this.guilds.get(window.location.pathname.split("/")[2]);
        }
    });

    Object.defineProperty(Discord.Client.prototype, 'selectedChannel', {
        get: function () {
            return window.location.pathname.split("/")[3] ? this.channels.get(window.location.pathname.split("/")[3]) : undefined;
        }
    });

    Object.defineProperty(Discord.Guild.prototype, 'element', {
        get: function () {
            return document.querySelector(`a[href*="${this.id}"]`).parentNode.parentNode.parentNode;
        }
    });

    Object.defineProperty(Discord.Guild.prototype, 'selected', {
        get: function () {
            return this.element.className.includes("selected");
        }
    });

    Object.defineProperty(Discord.DMChannel.prototype, 'element', {
        get: function () {
            return document.querySelector(`a[href="/channels/@me/${this.id}"]`) ? document.querySelector(`a[href="/channels/@me/${this.id}"]`).parentNode : null;
        }
    });

    Object.defineProperty(Discord.DMChannel.prototype, 'selected', {
        get: function () {
            return this.element.className.includes("selected");
        }
    });

    Object.defineProperty(Discord.GroupDMChannel.prototype, 'element', {
        get: function () {
            return document.querySelector(`a[href="/channels/@me/${this.id}"]`) ? document.querySelector(`a[href="/channels/@me/${this.id}"]`).parentNode : null;
        }
    });

    Object.defineProperty(Discord.GroupDMChannel.prototype, 'selected', {
        get: function () {
            return this.element.className.includes("selected");
        }
    });

    Object.defineProperty(Discord.TextChannel.prototype, 'visible', {
        get: function () {
            return this.permissionsFor(this.client.user).has("READ_MESSAGES");
        }
    });

    Object.defineProperty(Discord.TextChannel.prototype, 'unread', {
        get: function () {
            if (!this.element) return null;
            let reactInst = (node) => node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
            return reactInst(this.element)._currentElement.props.children.props.unread;
        }
    });

    Object.defineProperty(Discord.GuildChannel.prototype, 'element', {
        get: function () {
            let reactInst = (node) => node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
            let channels = document.querySelectorAll(".channels-wrap .scroller-fzNley .containerDefault-7RImuF");
            for (let i in channels) {
                let channel = channels[i];
                let react = reactInst(channel);
                if (!react) continue;
                if (react._currentElement.props.children[0]) {
                    if (react._currentElement.props.children[0].props.channel.id === this.id) {
                        return channel;
                    }
                } else {
                    if (react._currentElement.props.children.props.channel.id === this.id) {
                        return channel;
                    }
                }
            }
            return null;
        }
    });

    Object.defineProperty(Discord.Message.prototype, 'element', {
        get: function () {
            let reactInst = (node) => node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
            let messages = document.querySelectorAll(".message");
            for (let i in messages) {
                let message = messages[i];
                let react = reactInst(message);
                if (!react) continue;
                let id = message.parentNode.parentNode.classList.contains('compact') ? react._currentElement.props.children[0].props.children[1].props.subscribeTo.split("_")[3] : react._currentElement.props.children[0].props.children[1].props.children[1].props.subscribeTo.split("_")[3];
                if(id === this.id){
                    return message;
                }
            }
            return null;
        }
    });
};