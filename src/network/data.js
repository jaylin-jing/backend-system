import HttpRequest from './request'

export const getData = () => {
    console.log(HttpRequest)
    return HttpRequest.request({
        url: '/home/getData',
        method: 'get'
    })
}