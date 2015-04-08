angular.module('cpLib').factory('PackagesFactory', function(API_BASE, ApiService,
        getPackagingTypeTextFilter) {
    return {
        getAllPackages: () => ApiService.get(`${API_BASE}/packages`),

        getPackage: id => ApiService.get(`${API_BASE}/packages/${id}`),

        getPackageByHumanId: humanId => ApiService.get(`${API_BASE}/packages/${humanId}`),

        createPackage: packageDetails => ApiService.post(`${API_BASE}/packages`, packageDetails),

        updatePackage: (id, updatedPackage) => ApiService.put(`${API_BASE}/packages/${id}`, updatedPackage),

        deletePackage: id => ApiService.delete(`${API_BASE}/packages/${id}`),

        searchPackages(name = '', postcode = '', maxBudget = '', headCount = '', time = '', date = '',
                eventTypeId = '', cuisineTypeId = '') {
            const url = `${API_BASE}/packages/search?name=${name}&postcode=${postcode}` +
                `&maxBudget=${maxBudget}&headCount=${headCount}&time=${time}&date=${date}` +
                `&eventTypeId=${eventTypeId}&cuisineTypeId=${cuisineTypeId}`;

            return ApiService.get(url);
        },

        getPackagesByVendor: id => ApiService.get(`${API_BASE}/packages/search/all?vendorId=${id}`),

        getPackagesByCurrentVendor: () => ApiService.get(`${API_BASE}/packages/by-current-vendor`),

        getPackageReviews: id => ApiService.get(`${API_BASE}/reviews/package/${id}`),

        getSimilarPackages: id => ApiService.get(`${API_BASE}/packages/${id}/similar`),

        approvePackage: (id) => ApiService.put(`${API_BASE}/packages/${id}/approve`),

        getAllergenTypes: () => ApiService.get(`${API_BASE}/allergen-types`),

        getDietaryTypes: () => ApiService.get(`${API_BASE}/dietary-requirements`),

        getEventTypes: () => ApiService.get(`${API_BASE}/event-types`),

        getCuisineTypes: () => ApiService.get(`${API_BASE}/cuisine-types`),

        getDeliveryDayOptions: () => {
            return [
                { label: 'Monday',    value: 'Monday' },
                { label: 'Tuesday',   value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday',  value: 'Thursday' },
                { label: 'Friday',    value: 'Friday' },
                { label: 'Saturday',  value: 'Saturday' },
                { label: 'Sunday',    value: 'Sunday' }
            ];
        },

        getDeliveryTimeOptions: () => {
            var minutes = 0;

            const options = [];

            while (minutes < 60 * 24) {
                let hour = ('0' + Math.floor(minutes / 60)).slice(-2);
                let minute = ('0' + minutes % 60).slice(-2);

                options.push({
                    label: hour + ':' + minute,
                    value: parseInt(hour + minute, 10)
                });

                minutes += 30;
            }

            return options;
        },

        getNoticeOptions: () => {
            return [
                { label: '1 hour',   value: 1 },
                { label: '2 hours',  value: 2 },
                { label: '3 hours',  value: 3 },
                { label: '4 hours',  value: 4 },
                { label: '5 hours',  value: 5 },
                { label: '6 hours',  value: 6 },
                { label: '12 hours', value: 12 },
                { label: '18 hours', value: 18 },
                { label: '24 hours', value: 24 },
                { label: '36 hours', value: 36 },
                { label: '2 days',   value: 48 },
                { label: '3 days',   value: 72 },
                { label: '4 days',   value: 96 },
                { label: '5 days',   value: 120 },
                { label: '6 days',   value: 144 },
                { label: '7 days',   value: 168 },
                { label: '14 days',  value: 336 }
            ];
        },

        getQuantityOptions: () => {
            var i = 1;
            var step = 1;

            const options = [];

            while (i <= 6000) {
                options.push(i);

                if (30 <= i && i < 100) {
                    step = 5;
                } else if (100 <= i && i < 500) {
                    step = 25;
                } else if (500 <= i && i < 1000) {
                    step = 50;
                } else if (i >= 1000) {
                    step = 500;
                }

                i += step;
            }

            return options;
        },

        getRadiusOptions: () => {
            const options = [];

            for (let i = 1, step = 1; i <= 50; i += step) {
                options.push({
                    label: i + ' mile radius',
                    value: i
                });
                if (i === 5) {
                    step = 5;
                }
            }

            return options;
        },

        getPackagingTypeOptions: () => {
            return [1, 2, 3].map(value => ({ value, label: getPackagingTypeTextFilter(value) }));
        },

        getPackageDeliveryTimeOptions: (start, end, interval = 15) => {
            let startMinutes = (Math.floor(start / 100) * 60) + (start % 100);
            let endMinutes = (Math.floor(end / 100) * 60) + (end % 100);

            const options = [];

            while (startMinutes <= endMinutes) {
                const hour = ('0' + Math.floor(startMinutes / 60)).slice(-2);
                const minute = ('0' + startMinutes % 60).slice(-2);

                options.push({
                    label: hour + ':' + minute,
                    value: parseInt(hour + minute, 10)
                });

                startMinutes += interval;
            }

            return options;
        },

        checkIfPackageCanBeDeliveredToPostcode: (id, postcode) => ApiService.get(`${API_BASE}/packages/${id}/availability?postcode=${postcode}`),

        checkIfPackageCanBeDelivered: (id, dateTime, postcode) => ApiService.get(`${API_BASE}/packages/${id}/availability?dateTime=${dateTime}&postcode=${postcode}`)
    };
});