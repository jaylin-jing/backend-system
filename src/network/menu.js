import HttpRequest from './request'

export const getMenuAdmin = (param) => {
    return HttpRequest.request({
        url: '/permission/getMenu/admin',
        method: 'post',
        data: param
    })
}

export const getMenuUser = (param) => {
    return HttpRequest.request({
        url: '/permission/getMenu/user',
        method: 'post',
        data: param
    })
}