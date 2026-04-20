let nums = [1,2,1];
var getConcatenation = function(nums) {
    let ans = []
    let n = nums.length;
    for (let i=0; i<=n; i++) {
        ans[i] = nums[i];
        ans[i + n] = nums[i];
    }
    return ans;
};

console.log(getConcatenation(nums));