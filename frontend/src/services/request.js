import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiMmQxOGFjZGIyMzdlMDc5ZGIwOGUxMjYyODM3YzYyM2Q3OWU0NmJjNTVjOTBhZTBiM2ZmYjAxZDhkNTgxMTIzZGJmMjY4NjdiZjYxOTgwYTciLCJpYXQiOjE1OTc4OTE5OTUsIm5iZiI6MTU5Nzg5MTk5NSwiZXhwIjoxNjI5NDI3OTk1LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.Fx0M65h6gyUNXG9KUv1cJcV--BgKyeD4W-IUb92pOhiN-CQ6dJoBkxqY04Cf5XdlgOV70LTjM5rn_B8bDphAN0qjB1mPGzshkVcq-FKXbuUyqjdWjl2KM_oEYJW7sk6us6Jw-3L8YK6m0cXaOrbJSkr10vWZiDgfXVcdBGm0Gwd0HrP-QYQFNspK0h_yeMyDC_MstZpoobdcpdS8cvW-9AZAiK6-9G2mkFOF5ymcO7h8RhSZXvSepYIalVHqImSMXRhbRApkHJiwK20gBeqMHolaXQ3hQKvlcEkOAJVVN8isCZOLbncO-VEiO9SKDW4euwqWkDsHVmNRFvmhGg9uh6y87KcS_jdHyvuQWxamXgg2oQa2b_MRcVmmBuuax8f5wEbyeXfk3toCdFtWDr_hj4wJAxwBg7RubVLtevhx1YpWRE5l_Oq96XgjFsuAsJ5B4rmv7ep6BiPtDns-GgaSdHyv9AS752mxk5QK1RGgh9CZ0niMIIMR_8OTz01nmkoPxHjiyppR3j8jgqqEL_DrJ0CQxwEV6xciuYq2E0Ma7jA4G8z_cgiIiZngj80C5OnRuVGQETzE7fgtLAXCL1ZnALuDPTEtE_w8PidADKRUzsHVj4qJHvyQoBZv8fitpNOcavcrey0bXMvJSHSXLXN_HuDh8Xkch1_fN6JaLzF6CeM`;
axios.defaults.headers.common['Accept'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default {
    apiUrl: function () {
        //return 'https://lerose-apps.com/app/backend/public/api'
        return 'http://localhost:8000/api'
    },
    get: function (url, callback) {
        axios.get(url).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            } else {
                alert("Error");
            }
        });
    },
    postForm: function (url, params, callback) {
        var formData = new FormData();

        for (var key in params) {
            formData.append(key, params[key])
        }
        axios.post(url, formData, { headers: { 'Content-type': 'multipart/form-data' } }).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        })

    },
    post: function (url, paramsData, callback) {

        axios.post(url, paramsData).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            } else {
                alert("Error");
            }
        });
    },
    put: function (url, paramsData, callback) {

        axios.put(url, paramsData).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            } else {
                alert("Error");
            }
        });
    },
    delete: function (url, paramsData, callback) {
        axios.delete(url, { data: paramsData }).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            } else {
                alert("Error");
            }
        });
    },
    getItems: function (params,callback) {
        let url = this.apiUrl() + "/user/"+params.id+"/todo";
        this.get(url, callback);
    },
    getUsers: function (callback) {
        let url = this.apiUrl() + "/users";
        this.get(url, callback);
    }
}