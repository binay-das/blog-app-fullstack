export default function LogInPage() {
    return (
        <>
            <form className="login">
            <h1>Log In</h1>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />

                <button>Log In</button>
            </form>
        </>
    );
}