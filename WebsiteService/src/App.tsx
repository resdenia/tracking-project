/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import React, { Suspense, useEffect } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import pbjs from 'prebid.js';
import { HomePageAsync } from './pages/Home/Home.async';
import { AboutPageAsync } from './pages/About/About.async';
import { BlogPageAsync } from './pages/Blog/Blog.async';
import { ContactUsPageAsync } from './pages/ContactUs/ContactUs.async';
import {
    adSettings,
    adUnits,
    PREBID_TIMEOUT,
    FAILSAFE_TIMEOUT,
} from './utils/adSettings';

function App() {
    useEffect(() => {
        googletag.cmd = googletag.cmd || [];
        googletag.cmd.push(function () {
            googletag.pubads().disableInitialLoad();
        });
        function initAdserver() {
            if (pbjs.initAdserverSet) return;
            pbjs.initAdserverSet = true;
            pbjs.enableSendAllBids = true;

            googletag.cmd.push(function () {
                pbjs.que.push(function () {
                    googletag.pubads().refresh();
                });
            });
        }
        pbjs.que = pbjs.que || [];

        pbjs.que.push(function () {
            pbjs.addAdUnits(adUnits);
            pbjs.requestBids({
                bidsBackHandler: initAdserver,
                timeout: PREBID_TIMEOUT,
            });
        });

        setTimeout(function () {
            initAdserver();
        }, FAILSAFE_TIMEOUT);

        adSettings.forEach((ad) => {
            googletag.cmd.push(function () {
                googletag
                    .defineSlot(ad.slot, ad.sizes, ad.id)
                    .addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
            });
            googletag.cmd.push(function () {
                googletag.display(ad.id);
            });
        });
    }, []);

    return (
        <Suspense fallback={<div>loading</div>}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePageAsync />}
                    />
                    <Route
                        path="/about"
                        element={<AboutPageAsync />}
                    />
                    <Route
                        path="/blog"
                        element={<BlogPageAsync />}
                    />
                    <Route
                        path="/Contact"
                        element={<ContactUsPageAsync />}
                    />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
