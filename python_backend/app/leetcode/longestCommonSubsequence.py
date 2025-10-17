from app.leetcode.framework import Problem, ArgError

class LongestCommonSubsequence( Problem ):
    def solution( self, args ):
        if( "s1" not in args and "s2" not in args ):
            raise ArgError( "nums not in given arguments" )

        s1, s2 = args["s1"], args["s2"]

        n, m = len( s1 ), len( s2 )

        dp = [ [0] * (m + 1) for _ in range(n + 1) ]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if( s1[i - 1] == s2[j - 1] ):
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max( dp[i - 1][j], dp[i][j - 1] )
        
        return dp[n][m]
        
        