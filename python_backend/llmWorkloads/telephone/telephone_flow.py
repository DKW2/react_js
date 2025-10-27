from pocketflow import Flow
from .telephone_nodes import LLMContinueNode, CompareResultsNode

def create_telephone_flow(prompt, llm_count=3):
    """
    Create and configure the telephone game workflow
    
    Args:
        llm_count (int): Number of LLMs in the chain (default: 3)
    """
    # Create nodes
    llm_nodes = [LLMContinueNode() for _ in range(llm_count)]
    compare = CompareResultsNode()
    
    # Connect nodes in sequence: user_input >> llm1 >> llm2 >> llm3 >> compare
    flow = llm_nodes[0]
    prev = flow
    for llm_node in llm_nodes[1:]:
        prev >> llm_node
        prev = llm_node
    prev >> compare
    
    # Create flow starting with user input
    telephone_flow = Flow(start=flow)
    
    return telephone_flow
