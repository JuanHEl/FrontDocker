export default function ({app,redirect}) {
    if (!app.$cookies.get('user')) {
        return redirect('/login')
    }
}