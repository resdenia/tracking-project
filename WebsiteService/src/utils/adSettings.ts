export const headerSizes = [
    [320, 50],
    [728, 90],
];
export const footerSizes = [[728, 90]];
export const sidebarSizes = [[320, 480]];
export const PREBID_TIMEOUT = 1000;
export const FAILSAFE_TIMEOUT = 3000;

export const adSettings = [{

    slot: '/67918084/NewHeader',
    id: 'ad-slot-header',
    sizes: headerSizes,
},
{

    slot: '/67918084/adSidebar',
    id: 'ad-slot-sidebar',
    sizes: sidebarSizes,
},
{

    slot: '/67918084/adFooter',
    id: 'ad-slot-footer',
    sizes: footerSizes,
},
];

export const adUnits = [
    {
        code: '/67918084/HeaderNew',
        mediaTypes: {
            banner: {
                sizes: headerSizes,
            },
        },
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: 13144370,
                },
            },
        ],
    },
    {
        code: '/67918084/adFooter',
        mediaTypes: {
            banner: {
                sizes: footerSizes,
            },
        },
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: 13144370,
                },
            },
        ],
    },
    {
        code: '/67918084/adSidebar',
        mediaTypes: {
            banner: {
                sizes: sidebarSizes,
            },
        },
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: 13144370,
                },
            },
        ],
    },
];
