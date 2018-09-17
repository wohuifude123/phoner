/**
 * mount virtual dom to real dom
 */

function vnode (tag, data, children, text) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
}

function createElm (vnode) {
    let tag = vnode.tag;
    let data = vnode.data;
    let children = vnode.children;

    if (tag !== undefined) {
        vnode.elm = document.createElement(tag);

        if (data.attrs !== undefined) {
            var attrs = data.attrs;
            for (var key in attrs) {
                vnode.elm.setAttribute(key, attrs[key])
            }
        }
        if (children) {
            createChildren(vnode, children)
        }
    } else {
        vnode.elm = document.createTextNode(vnode.text);
    }

    return vnode.elm;
}

function createChildren (vnode, children) {
    for (var i = 0; i < children.length; ++i) {
        vnode.elm.appendChild(createElm(children[i]));
    }
}

function patch (oldVnode, vnode) {

    createElm(vnode)

    var isRealElement = oldVnode.nodeType !== undefined ; // virtual node has no `nodeType` property
    if (isRealElement) {
        var parent = oldVnode.parentNode;
        if (parent) {
            parent.insertBefore(vnode.elm, oldVnode);
            parent.removeChild(oldVnode);
        }
    }

    return vnode.elm
}

function render () {
    return new vnode(
        'div',
        {
            attrs: {
                'class': 'wrapper'
            }
        },
        [
            new vnode(
                'p',
                {
                    attrs: {
                        'class': 'inner'
                    }
                },
                [new vnode(undefined, undefined, undefined, '专注于手机端开发')]
            )
        ]
    )
}

function mount (el) {
    var vnode = render();
    patch(el, vnode)
}

//mount(document.querySelector("#app"))

var phoner = {

    vnode (tag, data, children, text) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        console.log( 'phoner.vnode', tag, data, children, text )
    },

    createElm (vnode) {
        let tag = vnode.tag;
        let data = vnode.data;
        let children = vnode.children;

        if (tag !== undefined) {
            vnode.elm = document.createElement(tag);

            if (data.attrs !== undefined) {
                var attrs = data.attrs;
                for (var key in attrs) {
                    vnode.elm.setAttribute(key, attrs[key])
                }
            }
            if (children) {
                createChildren(vnode, children)
            }
        } else {
            vnode.elm = document.createTextNode(vnode.text);
        }

        return vnode.elm;
    },

    createChildren (vnode, children) {
        for (var i = 0; i < children.length; ++i) {
            vnode.elm.appendChild(createElm(children[i]));
        }
    },

    patch (oldVnode, vnode) {

        createElm(vnode)

        var isRealElement = oldVnode.nodeType !== undefined ; // virtual node has no `nodeType` property
        if (isRealElement) {
            var parent = oldVnode.parentNode;
            if (parent) {
                parent.insertBefore(vnode.elm, oldVnode);
                parent.removeChild(oldVnode);
            }
        }

        return vnode.elm
    },

    render () {
        return new vnode(
            'div',
            {
                attrs: {
                    'class': 'wrapper'
                }
            },
            [
                new vnode(
                    'p',
                    {
                        attrs: {
                            'class': 'inner'
                        }
                    },
                    [new vnode(undefined, undefined, undefined, '专注于手机端开发')]
                )
            ]
        )
    },

    mount (el) {
        var vnode = this.render();
        patch(el, vnode)
    }

};

module.exports = phoner;

