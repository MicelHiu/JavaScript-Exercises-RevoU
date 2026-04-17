# ASYNCHRONOUS FUNCTION
- **Synchronous** = execution in order, one by one. Jadi kalau step 2 belum kelar gabisa lompat ke step 3.
- **Asynchronous** = move on the next task immedietly, not waiting. jadi bisa ada step yang jalan barengan. Biasanya dipake buat loading2 jadi ga ngehenk tampilannya.
- contoh: Mie ayam
```
console.log("1. Ordering Mie ayam");

//simulating a 2-second cooking process [11]
setTimeout(function() {
    console.log("2. Mie ayam is ready! (finished after 2 seconds)");
}, 2000) // 2 sekon

console.log("3. sitting down and checking phone..");
// execution order wont be always 1, 2, 3.
```
- jadi setiap asynchronous, saat komputer request ke server, waktu buat render nya itu menghasilkan tipe data PROMISE().

## Callbacks
- functions passed as arguments to other functions
- commonly used in asynchronous programming to execute code after a certain operation finishes.
- mengembalikan promise(?) (string)
- akan dipakai saat fungsi async kelar.
- contoh:
```
function fetchData(callback) {
    setTimeout(function() {
        console.log("Data fetched!");
        callback(); // berjalan saat 2 detik kelar.
    }, 2000);
}

function processData() {
    console.log("Data Processed!");
}

fetchData(processData); // callback berupa process data.
```

## Promises
- cleaner way to handle asynchronous operations.
- represents a value which might be available now, or in the future, or never.
- callback berupa objek(?)
- contoh:
```
function fetchData() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const success = Math.random() < 0.5; // simulating success or failure
            if (success) {
                console.log("Data fetched successfully!");
                resolve();
            } else {
                console.log("Error fetching Data!");
                reject();
            }
        }, 2000);
    });
}

fetchedData()
    .then(function() {
        console.log("Data Processed!");
    });
    .catch(function() {
        console.log("Retry or handle the error");
    });
```

## Async/Await
- a syntatic sugar built on top of promises.
- allows writing asynchronous code in a more synchronous-looking way.
- melibatkan promise
- syntax ini bisa digunakan untuk menggantikan then/catch
- bisa juga di resolve pake try/catch
- contoh:
```
async function fetchData() {
    return new Promise(funtion(resolve) {
        setTimeout(function() {
            console.log("data fetched succefully");
            resolve("Fetched data");
        }, 2000);
    });
}

async function processData() {
    const data = await fetchData();
    console.log("data processed" + data);
}

processData();
```
- await => analoginya "ga usa nunggu aku beres, kamu dluan aja"

Other example: https://github.com/djiwandou-p/js-asynchronous-examples