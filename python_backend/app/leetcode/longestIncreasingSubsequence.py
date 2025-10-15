from app.leetcode.framework import Problem, ArgError
from bisect import bisect_left

# Consider only strictly increasing
class LongestIncreasingSubsequence( Problem ):
    def solve( self ):
        if( "nums" not in self.args ):
            raise ArgError( "nums not in given arguments" )

        nums = self.args["nums"]

        n = len( nums )

        ans = []
        tails_idx = []       # tails_idx[len-1] = index of LIS ending element
        prev_idx = [-1] * n  # back-pointer
        dp = []
        for i, num in enumerate(nums):
            ind = bisect_left( dp, num )
            if( ind == len( dp ) ):
                dp.append( num )
                tails_idx.append( i )
            else:
                dp[ind] = num
                tails_idx[ind] = i
            if( ind > 0 ):
                prev_idx[i] = tails_idx[ind - 1]

        k = tails_idx[-1]
        while k != -1:
            ans.append(nums[k])
            k = prev_idx[k]
        
        return ans[::-1]
        
        