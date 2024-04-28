import MainHeader from '../MainHeader/Header.jsx';

const MainLayout = ({ children }) => (
    <div>
        <MainHeader/>
        <div>{children}</div>
    </div>
);

export default MainLayout;