var http = {
    get: function(url) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: 'get',
                success: function(data) {
                    resolve(data);
                },
                error: function(xhr, statusText) {
                    reject(statusText);
                }
            });
        });
        return promise;
    }
};
//等待一个请求完成以后拿到结果，然后再then里用这个结果去处理别的事情
http.get('solve.php').then(
    function(data) {
        return data;
    },
    function(err) {
        return Promise.reject('Sorry, file not Found.');
    }
).then(
    function(data) {
        document.write(data);
    },
    function(err) {
        document.write(err);
    }
);