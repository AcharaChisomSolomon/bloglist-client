import Proptypes from 'prop-types';

const LoginForm = ({
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    handleLogin,
}) => { 
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    username: Proptypes.string.isRequired,
    handleUsernameChange: Proptypes.func.isRequired,
    password: Proptypes.string.isRequired,
    handlePasswordChange: Proptypes.func.isRequired,
    handleLogin: Proptypes.func.isRequired,
};

export default LoginForm;