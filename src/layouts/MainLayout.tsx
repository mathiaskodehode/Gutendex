import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <div className="content-container">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
}
