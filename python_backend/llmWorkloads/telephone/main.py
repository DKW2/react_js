from .telephone_flow import create_telephone_flow
from .telephone_nodes import extract_last_sentence
import argparse

def run_telephone_game(prompt="", llm_count=3):
    # Initialize shared data
    shared = {
        "llm_count": llm_count,
        "original_paragraph": prompt,
        "current_last_sentence": extract_last_sentence(prompt),
        "story_parts": [prompt],
        "final_comparison": ""
    }
    
    # Run the flow
    flow = create_telephone_flow(llm_count)
    flow.run(shared)
    
    # Output summary
    print("\n=== Telephone Game Completed ===\n")
    print(f"Original paragraph length: {len(shared['original_paragraph'])} characters")
    print(f"Number of LLM continuations: {len(shared['story_parts'])}")
    print(f"Final story length: {len(shared['story_parts'][-1]) if shared['story_parts'] else 0} characters")
    
    return shared

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PocketFlow Telephone Game")
    parser.add_argument("topic", nargs="?", default="", help="Optional topic suggestion for the user")
    parser.add_argument("--llm-count", type=int, default=3, help="Number of LLMs in the chain (default: 3)")
    
    args = parser.parse_args()
    
    run_telephone_game(args.topic, args.llm_count)
