const getScript = (url) => new Promise((resolve, reject) => {

    const script = document.createElement('script')
    script.type = "text/javascript";
    script.src = url
    script.async = true

    script.onerror = (e) => reject(e);
    script.onload = async () => {
        resolve();
    };
    
    document.body.appendChild(script);
});


// useEfeect 사용
// const getScript = (url) => {

//     const script = document.createElement('script');

//     useEffect(() => {

//         console.log('useScript');
//         script.type="text/javascript";
//         script.src = url;
//         script.async = true;
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };

//     }, [url]);

//     return new Promise(resolve => {
//         script.onload = async () => resolve()
//     });

// };

export default getScript;