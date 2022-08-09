import HttpRequest from './request'

export const getUser = (params) => {
    return HttpRequest.request({
        url: '/userx/getUser',
        method: 'get',
        params
    })
}