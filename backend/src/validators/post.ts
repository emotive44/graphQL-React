import { isValidObjectId } from "mongoose";

interface PostInput {
  text: string
}

const validatePostInput = (postInput: PostInput) => {
  const errors = {} as PostInput;

  const { text } = postInput;

  if(text.trim() === '') {
    errors.text = 'Can not create post without content';
  } 

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

export {
  validatePostInput,
}