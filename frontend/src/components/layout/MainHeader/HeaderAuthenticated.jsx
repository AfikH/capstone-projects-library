import useAuth from "../../../hooks/useAuth"
import AuthenticatedMenu from "./AuthenticatedMenu";

const HeaderAuthenticated = () => {
    const { user } = useAuth();

    return (
        <div className="main-header-authenticated">
            <span className="name">{`${user.raw.firstName} ${user.raw.lastName}`}</span>
            <div className="main-header-authenticated-buttons">
                <AuthenticatedMenu />
            </div>
        </div>
    )
}

export default HeaderAuthenticated;