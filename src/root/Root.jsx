import Sidebar from '../dashboard/sidebar/Sidebar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className="flex">
            {/* Sidebar fixed */}
            <Sidebar />

            {/* Main content takes remaining space and scrolls */}
            <main className="ml-[16rem] w-full h-screen overflow-y-auto p-6 bg-yellow-50">
                <Outlet />
            </main>
        </div>
    );
};

export default Root;