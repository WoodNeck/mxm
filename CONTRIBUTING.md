### Commit Guidelines
- Angular Commit Guideline 이용

We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the project history.
### Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.
### Revert

If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.
### Type

Must be one of the following:

    * feat: A new feature
    * fix: A bug fix
    * docs: Documentation only changes
    * style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    * refactor: A code change that neither fixes a bug nor adds a feature
    * perf: A code change that improves performance
    * test: Adding missing or correcting existing tests
    * chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope could be anything specifying place of the commit change.

    * fe (alias for frontend)
    * be (alias for backend)
You can use `*` when the change affects more than a single scope.
### Subject

The subject contains succinct description of the change:

    * 명사형으로 작성: "수정함"이나 "수정하였음"이 아니라 "수정".
    * 마지막에 마침표(.)는 사용하지 말 것.

### Body

The body should include the motivation for the change and contrast this with previous behavior.
### Footer

The footer should contain any information about **Breaking Changes** and is also the place to [reference GitHub issues that this commit closes.](https://help.github.com/articles/closing-issues-via-commit-messages/)
**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
