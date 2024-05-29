import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels = (str : string) : number => 
    stringToArray(str).reduce((acc : number, cur : string) : number  => isVowel(cur) + acc  , 0);

const isVowel = (c : string) : number => ("AEIOUaeiou".includes(c) ? 1 : 0); 

/* Question 2 */
export const isPaired = (str : string): boolean => myFilter(str).reduce(reducer , []).length === 0;

const reducer = (stack : string[], char : string) : string[] => 
    "([{".includes(char) ?
     [...stack, char] 
     : (stack[stack.length-1] == '(' && char == ')')
     ||  (stack[stack.length-1] == '{' && char == '}')
     ||  (stack[stack.length-1] == '[' && char == ']')?
    stack.slice(0, stack.length-1) : [...stack, char];

const myFilter = (str : string) : string[] => stringToArray(str).filter( (x : string) : boolean => "[](){}".includes(x));


/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}


export const treeToSentence = (tree: WordTree): string => (
                tree.root + (tree.children.length === 0 ? ' ' : ' ' + tree.children.map(treeToSentence).join(' '))
                ).trim();

