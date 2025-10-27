import re
from pocketflow import Node
from llmWorkloads.utils.call_llm import call_llm

def extract_last_sentence(text):
    """
    Extract the last sentence from a given text
    """
    # Split by sentence endings and filter out empty strings
    sentences = re.split(r'[.!?]+', text.strip())
    sentences = [s.strip() for s in sentences if s.strip()]
    
    if sentences:
        # Get the last sentence and add back the punctuation
        last_sentence = sentences[-1]
        # Find the original punctuation for this sentence
        text_after_last_period = text.rfind('.')
        text_after_last_exclamation = text.rfind('!')
        text_after_last_question = text.rfind('?')
        
        last_punctuation_pos = max(text_after_last_period, text_after_last_exclamation, text_after_last_question)
        
        if last_punctuation_pos != -1:
            last_sentence = text[:last_punctuation_pos + 1]
        
        return last_sentence
    return text

class LLMContinueNode(Node):
    def prep(self, shared):
        """
        Get the last sentence to continue from
        """
        return shared["current_last_sentence"]
    
    def exec(self, last_sentence):
        """
        Continue the story from the last sentence
        """
        prompt = f"""
        Continue this story from the following sentence. Write 2-3 sentences that naturally follow:
        
        "{last_sentence}"
        
        Requirements:
        - Write 2-3 sentences only
        - Make it a natural continuation
        - Be creative and engaging
        - End with a complete sentence
        """
        
        return call_llm(prompt)
    
    def post(self, shared, prep_res, exec_res):
        """
        Store the LLM's continuation and extract its last sentence
        """
        # Add this continuation to the story parts
        shared["story_parts"].append(exec_res)
        
        # Extract the last sentence for the next LLM
        shared["current_last_sentence"] = extract_last_sentence(exec_res)
        
        # Show progress
        llm_number = len(shared["story_parts"]) - 1  # -1 because we include the original
        print(f"=== LLM {llm_number} Continuation ===")
        print(exec_res)
        print(f"\nLast sentence for next LLM: {shared['current_last_sentence']}")
        print()
        
        return "default"

class CompareResultsNode(Node):
    def prep(self, shared):
        """
        Get all story parts for comparison
        """
        return shared["story_parts"]
    
    def exec(self, story_parts):
        """
        Create a comparison of the story progression
        """
        if len(story_parts) < 2:
            return "Not enough story parts to compare"
        
        original = story_parts[0]
        final = story_parts[-1]
        
        comparison = f"""
=== TELEPHONE GAME RESULTS ===

ORIGINAL PARAGRAPH:
{original}

FINAL STORY (after {len(story_parts)-1} LLM continuations):
{final}

STORY PROGRESSION:
"""
        
        for i, part in enumerate(story_parts):
            if i == 0:
                comparison += f"\n{i}. ORIGINAL: {part[:100]}...\n"
            else:
                comparison += f"\n{i}. LLM {i}: {part[:100]}...\n"
        
        return comparison
    
    def post(self, shared, prep_res, exec_res):
        """
        Store and display the final comparison
        """
        shared["final_comparison"] = exec_res
        print(exec_res)
        
        return "default"
