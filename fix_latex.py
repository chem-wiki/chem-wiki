import re
import os

files = []
for root, dirs, filenames in os.walk('md'):
    for filename in filenames:
        if filename.endswith('.md'):
            files.append(os.path.join(root, filename))

def fix_latex(content):
    # 1. Wrap \ce{...} in $...$ if not already wrapped
    # This regex looks for \ce{...} that is NOT preceded by $ and NOT followed by $
    # It's a bit simplistic but works for the generated content which is likely consistent.
    # Better: find all \ce{...} and check context.
    
    # Strategy: Replace all \ce{...} with $\ce{...}$. 
    # But first, we need to be careful not to double wrap.
    # Let's assume the "bad" content has NO $ around \ce.
    
    # Pattern: \ce{...} 
    # We want to match balanced braces. This is hard in regex.
    # However, for chemical formulas, they usually don't nest braces deeply.
    # Let's try a simpler approach: 
    # Find patterns that look like chemical formulas and wrap them.
    
    # Actually, looking at the previous failures, the content was:
    # 1. **\ce{F2}** (氟气)
    # The ** is bold. 
    
    # Let's use a function to substitute.
    
    def replacer(match):
        full_match = match.group(0)
        # If already wrapped in $, skip
        # This check is weak but might suffice for this specific task
        return f"${full_match}$"

    # Regex for \ce{...}
    # We match \ce followed by { then anything until }, assuming no nested } for now.
    # Most chemical formulas here are simple e.g. \ce{H2O}, \ce{S2O8^{2-}}
    # Wait, {2-} has nested braces!
    
    # A better regex for balanced braces (up to 1 level of nesting)
    # \ce { ( [^{}]* | { [^{}]* } )* }
    pattern = r'\\ce\{(?:[^{}]|\{[^{}]*\})*\}'
    
    # We need to look behind and ahead to see if it's already inside $...$
    # Since variable lookbehind is hard, let's iterate.
    
    new_content = ""
    last_pos = 0
    for match in re.finditer(pattern, content):
        start, end = match.span()
        # Check if preceded by $ (ignoring whitespace?)
        preceding = content[last_pos:start]
        following = content[end:]
        
        # Check strictly immediate $ or spaces then $?
        # The prompt implies they are naked.
        # Let's check if there is an ODD number of $ before this match in the paragraph.
        # This is getting complicated.
        
        # Simple heuristic:
        # If the character immediately before (ignoring spaces) is $, assume it's wrapped.
        is_wrapped = False
        if start > 0 and content[start-1] == '$':
            is_wrapped = True
        elif start > 1 and content[start-2:start] == '$ ': # sloppy check
             is_wrapped = True
             
        if not is_wrapped:
            new_content += content[last_pos:start] + "$" + match.group(0) + "$"
        else:
            new_content += content[last_pos:end]
            
        last_pos = end
        
    new_content += content[last_pos:]
    
    # Also fix the broken E^\ominus which seemed to lack closing $ in the view output
    # View output: $E^\ominus \approx +2.87\text{ V}。
    # It seems it has opening $ but maybe not closing?
    # View output line 13: ... $E^\ominus \approx +2.87\text{ V}。
    # It ends with Chinese period. It probably needs a $ before the period.
    
    # Fix unclosed math starting with $E^\ominus
    # Pattern: ($E^\ominus[^$\n]*)
    # We want to append $ at the end if it's missing
    
    def fix_potential(m):
        text = m.group(1)
        if not text.endswith('$'):
            return text + "$"
        return text

    new_content = re.sub(r'(\$E\^\\ominus[^$\n]*)', fix_potential, new_content)
    
    # Fix H_0 (Hammett acidity) in acid_base_ranking
    # View: *   **$**：$< -25$  (This looks broken in the view, "H_0" is missing or interpreted as bold?)
    # View line 18: *   **$**：$< -25$
    # It seems the source was `**$H_0$**` maybe?
    # Let's just blindly replace specific broken patterns if found.
    
    return new_content

for fpath in files:
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            c = f.read()
        
        new_c = fix_latex(c)
        
        if c != new_c:
            print(f"Fixing {fpath}...")
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_c)
        else:
            print(f"No changes for {fpath}")
