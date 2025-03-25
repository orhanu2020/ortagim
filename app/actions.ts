"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLoaction
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLoaction: true,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      endDate: endDate,
      startDate: startDate,
      homeId: homeId,
    },
  });

  return redirect("/");
}

export async function createGroup(formData: FormData) {
  let dbUser = await prisma.user.findUnique({
    where: {
      id: formData.get("id") as string,
    },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        email: "",
        firstName: formData.get("id") as string,
        lastName: formData.get("id") as string,
        id: formData.get("id") as string,
        profileImage: "",
      },
    });

    await prisma.home.create({
      data: {
        userId: formData.get("id") as string,
        categoryName: "1",
        photo: "/Kuran/Cüz_01/000.jpg",
      },
    });
    let pageCount: number = 0; // Initialize pageCount to 0
    for (let i = 1; i <= 30; i++) {
      // Start from 1 for Cüz_1
      for (let j = 1; j <= 20; j++) {
        // Start from 1 for 001.jpg
        pageCount++; // Increment pageCount for each image
        const juzNumber = i.toString().padStart(2, "0"); // Pad Cüz number
        const imageNumber = pageCount.toString().padStart(3, "0"); // Pad image number

        await prisma.home.create({
          data: {
            userId: formData.get("id") as string,
            photo: `/Kuran/Cüz_${juzNumber}/${imageNumber}.png`,
            categoryName: i.toString(),
          },
        });
      }
    }
    await prisma.home.create({
      data: {
        userId: formData.get("id") as string,
        categoryName: "30",
        photo: "/Kuran/Cüz_30/601.jpg",
      },
    });
    await prisma.home.create({
      data: {
        userId: formData.get("id") as string,
        categoryName: "30",
        photo: "/Kuran/Cüz_30/601.jpg",
      },
    });
    await prisma.home.create({
      data: {
        userId: formData.get("id") as string,
        categoryName: "30",
        photo: "/Kuran/Cüz_30/601.jpg",
      },
    });
    await prisma.home.create({
      data: {
        userId: formData.get("id") as string,
        categoryName: "30",
        photo: "/Kuran/Cüz_30/601.jpg",
      },
    });
  }
  redirect("/");
}

export async function selectGroupAction(value: string) {
  console.log(`server action called with ${value}`);
}
