from abc import ABC, abstractmethod

class Problem():
    def __init__( self, problemName, args ):
        self.args = args
        self.problemName = problemName

    def getProblemName( self ):
        return self.problemName

    @abstractmethod
    def solve( self ):
        pass

class ArgError(Exception):
    pass