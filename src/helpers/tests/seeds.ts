import {ObjectId} from "bson";
import intervals from "../../data/cards";
import { faker } from '@faker-js/faker';
import UserCard from "../../types/UserCard";

/**
 * Generate a random number integer
 * @param max
 */
function randomNumber(max: number) {
  return Math.round(Math.random() * max)
}

/**
 * Return a random true or false value
 */
function randomBool() : true | false {
  return Math.random() > 0.5;
}

/**
 * This file will expose many mock data used for testing
 */

export const cards = [

]


/**
 * Create a random amount of user cards
 * @param amount
 */
function makeRandomCards(amount: number): UserCard[] {
  const result = [];
  for (let cardNumber = 0; cardNumber < amount; cardNumber ++) {
    const newCard: UserCard = {
      isAssignedToConnectedUser: randomBool(),
      _id: new ObjectId(),
      cardId: new ObjectId(),
      currentDelay: intervals[randomNumber(intervals.length)],
      isMemorized: randomBool(),
      answer: faker.hacker.adjective(),
      isOwnerOfCard: randomBool(),
      category: null,
      currentSuccessfulAnswerStreak: randomNumber(5),
    }

    const shouldHaveAnImage = randomBool()
    if (shouldHaveAnImage) {
      newCard.image = faker.image.cats(400, 400, true);
    }
    else {
      newCard.question = faker.animal.cat()
    }

    result.push(newCard)
  }

  return result;
}