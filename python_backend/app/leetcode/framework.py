from abc import ABC, abstractmethod

class Problem():
    def __init__( self, problemName, args ):
        self.args = args
        self.problemName = problemName

    def getProblemName( self ):
        return self.problemName
    def setProblemName( self, problemName ):
        self.problemName = problemName
    def getArgs( self ):
        return self.args
    def setArgs( self, args ):
        self.args = args

    def solve( self, args = {} ):
        answer = self.solution( args ) if args else self.solution( self.args )
        return answer

    @abstractmethod
    def solution( self, args ):
        pass

class ArgError(Exception):
    pass