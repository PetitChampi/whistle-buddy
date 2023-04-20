import type { ICard, IInteractiveCard } from "@/types/MusicalDataTypes";

export default function getInteractiveCards(
  cards: ICard[], existingCards: IInteractiveCard[] = []
): IInteractiveCard[] {
  return cards.map((card: ICard) => {
    const existingCard = existingCards.find((c) => c.cardData.id === card.id);
    return {
      cardData: card,
      isFlipped: existingCard ? existingCard.isFlipped : false,
    };
  });
}