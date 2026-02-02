import { http, HttpResponse } from "msw";
import { createUsers, createInstitution } from "~/mocks/fixtures";
import { createCourses } from "./fixtures/courses";

const courses = createCourses.bulk(6);
const universities = createInstitution.bulk(2);
const users = createUsers.bulk(6);
const user = users[0]!;

function HttpNotFound() {
  return new HttpResponse("Not Found", { status: 404 });
}

const apiUrl = (path: string | URL | RegExp) => {
  if (path instanceof RegExp) {
    return path;
  }

  const baseUrl = "http://localhost:8000";
  return new URL(path, baseUrl).toString();
};

const sessionCookie = "sessionid=mock-session-id-123; Path=/; SameSite=Lax";
const expireCookie = "sessionid=; Path=/; SameSite=Lax; Max-Age=0";

const authHandlers = [
  http.post(apiUrl("/auth/register"), async (req) => {
    const data = (await req.request.json()) as { email: string };
    return HttpResponse.json(
      {
        ...user,
        role: "admin",
        email: data.email,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": [sessionCookie].join("; "),
        },
      },
    );
  }),
  http.post(apiUrl("/auth/login"), async (req) => {
    const data = (await req.request.json()) as { email: string };
    return HttpResponse.json(
      {
        ...user,
        role: "admin",
        email: data.email,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": [sessionCookie].join("; "),
        },
      },
    );
  }),
  http.post(apiUrl("/auth/logout"), () => {
    return HttpResponse.json(
      { message: "Logged out successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": [expireCookie].join("; "),
        },
      },
    );
  }),
];

const employeesHandlers = [
  http.get(apiUrl("/users"), () => {
    return HttpResponse.json(users);
  }),
  http.get(apiUrl(/\/users\/\d+/), (req) => {
    const url = new URL(req.request.url);
    const id = Number(url.pathname.split("/").pop());
    const lecturer = users.find((lecturer) => lecturer.id === id);

    if (lecturer) {
      return HttpResponse.json(lecturer);
    } else {
      return HttpNotFound();
    }
  }),
  http.post(apiUrl("/users/invite"), () => {
    return HttpResponse.json(null, { status: 204 });
  }),
  http.post(apiUrl("/users"), async ({ request }) => {
    const users = (await request.json()) as object[];

    const usersWithIds = users.map((user, index) => ({
      id: 1000 + index,
      ...user,
    }));
    return HttpResponse.json(usersWithIds);
  }),
  http.put(apiUrl(/\/users\/\d+/), async (req) => {
    const url = new URL(req.request.url);
    const id = Number(url.pathname.split("/").pop());
    const data = (await req.request.json()) as object;

    const updatedUser = {
      id,
      ...data,
    };

    return HttpResponse.json(updatedUser);
  }),
];

const universitiesHandlers = [
  http.get(apiUrl("/universities"), () => {
    return HttpResponse.json(universities);
  }),
  http.get(apiUrl(/\/universities\/\d+/), (req) => {
    const url = new URL(req.request.url);
    const id = Number(url.pathname.split("/").pop());
    const university = universities.find((v) => v.id === id);

    if (university) {
      return HttpResponse.json(university);
    }

    return HttpNotFound();
  }),
  http.post(apiUrl("/universities"), async ({ request }) => {
    const data = (await request.json()) as object;

    const newUniversity = {
      id: Math.floor(Math.random() * 1000) + 3,
      ...data,
    };

    return HttpResponse.json(newUniversity, { status: 201 });
  }),
  http.put(apiUrl(/\/universities\/\d+/), async (req) => {
    const url = new URL(req.request.url);
    const id = Number(url.pathname.split("/").pop());
    const data = (await req.request.json()) as object;

    const updatedUniversity = {
      id,
      ...data,
    };

    return HttpResponse.json(updatedUniversity);
  }),
];

const courseHandlers = [
  http.get(apiUrl("/courses"), () => {
    return HttpResponse.json(courses);
  }),

  http.get(apiUrl(/\/courses\/\d+/), (req) => {
    const url = new URL(req.request.url);
    const id = Number(url.pathname.split("/").pop());
    const course = courses.find((v) => v.id === id);

    if (course) {
      return HttpResponse.json(course);
    }

    return HttpNotFound();
  }),
];

const corsHandlers = [
  http.options("*", () => {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }),
];

export const handlers = [
  ...corsHandlers,
  ...authHandlers,
  ...employeesHandlers,
  ...universitiesHandlers,
  ...courseHandlers,
];
