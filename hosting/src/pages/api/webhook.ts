// Webhook response received from The Next Leg
import {firestore} from '@/db';
import {addDoc, collection} from 'firebase/firestore';

export default async function handler(req: any, res: any) {
  const { imageUrl, imageUrls, content, buttons, originatingMessageId, buttonMessageId, responseAt} = req.body as any;
  console.log(req.body);

  await addDoc(collection(firestore, 'imgs'), {
    content: content,
    imgUrl: imageUrl,
    imgUrls: imageUrls,
    buttons: buttons,
    createdAt: new Date(),
    responseAt: responseAt,
    //type: type,
    orMId: originatingMessageId,
    buttonMessageId: buttonMessageId
  });

  res.status(200).json({ name: 'John Doe' });
}
