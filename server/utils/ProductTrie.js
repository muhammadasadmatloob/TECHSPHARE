/**
 * Data Structures & Algorithms: Trie Node & Trie Class
 * Implements prefix match tree for instant product search suggestion algorithms.
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.products = [];
  }
}

export class ProductTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(keyword, product) {
    let node = this.root;
    const cleanWord = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');

    for (const char of cleanWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      
      // Store product reference at prefix nodes for instant suggestion lookup
      if (!node.products.some(p => p.id === product.id)) {
        node.products.push(product);
      }
    }
    node.isEndOfWord = true;
  }

  buildIndex(products) {
    this.root = new TrieNode();
    for (const product of products) {
      // Index product name words
      const words = product.name.split(/\s+/);
      for (const word of words) {
        this.insert(word, product);
      }
      // Index category & tag
      if (product.category) this.insert(product.category, product);
      if (product.tag) this.insert(product.tag, product);
    }
  }

  searchPrefix(prefix) {
    let node = this.root;
    const cleanPrefix = prefix.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (!cleanPrefix) return [];

    for (const char of cleanPrefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return node.products;
  }
}

export const productTrie = new ProductTrie();
