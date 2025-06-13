import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import MyPage from './MyPage.tsx';
import Profile from './Profile.tsx';
import OrderHistory from './OrderHistory.tsx';
import MinaTjanster from './MinaTjanster.tsx';
import Favoriter from './Favoriter.tsx';
import KundKlubb from './KundKlubb.tsx';

const tabs = [
    'MIN SIDA',
    'PROFIL',
    'ORDERHISTORIK',
    'MINA TJÄNSTER',
    'FAVORITER',
    'KUNDKLUBB'
];

function MinSida() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('MIN SIDA');
    const { user, logout } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('user');
        logout();
        navigate('/login');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'MIN SIDA':
                return <MyPage setActiveTab={setActiveTab} />;
            case 'PROFIL':
                return <Profile />;
            case 'ORDERHISTORIK':
                return <OrderHistory />;
            case 'MINA TJÄNSTER':
                return <MinaTjanster />;
            case 'FAVORITER':
                return <Favoriter />;
            case 'KUNDKLUBB':
                return <KundKlubb />;
            default:
                return <MyPage setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    {user
                        ? `Hej, ${user.firstName} ${user.lastName} 👋`
                        : 'Välkommen 👋'}
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logga ut
                </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-gray-300 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm px-4 py-2 rounded-t ${
                            activeTab === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Dynamic Content */}
            <div className="mt-4">
                {/*<h2 className="text-xl font-medium">{activeTab}</h2>*/}
                <div className="mt-2 text-gray-600">{renderTabContent()}</div>
            </div>
        </div>
    );
}

export default MinSida;
