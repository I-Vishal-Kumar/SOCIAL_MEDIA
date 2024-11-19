import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParticularPost from "@/components/posts/ParticularPost";

const avatarSrc = 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

jest.mock("graphql-request", () => ({
    GraphQLClient: jest.fn().mockImplementation(() => ({
        request: jest.fn().mockResolvedValue({}),

    })),
}));

jest.mock('@apollo/client', () => {
    return {
        ...jest.requireActual('@apollo/client'),
        useQuery: jest.fn().mockImplementation(() => ({
            loading: false,
            error: null,
            data: {
                usersCollection: {
                    edges: [
                        {
                            node: {
                                id: '1',
                                username: 'testuser',
                                email: 'test@example.com',
                                avatar: 'https://example.com/avatar.jpg',
                            },
                        },
                    ],
                },
            },
        })),
    };
});


describe("ParticularPost Component", () => {
    const defaultProps = {
        id: 1,
        avatar: avatarSrc,
        username: "JohnDoe",
        email: "johndoe@example.com",
        caption: "This is a sample post.",
        createdAt: "2023-11-18T12:34:56Z",
        fileUrl: avatarSrc,
    };

    it("renders the component with user information", () => {
        render(<ParticularPost {...defaultProps} />);

        expect(screen.getByAltText(defaultProps.username)).toBeInTheDocument();
        expect(screen.getByText("This is a sample post.")).toBeInTheDocument();
    });

    it("renders 'Anonymous' if username is not provided", () => {
        const propsWithoutUsername = { ...defaultProps, username: "" };
        render(<ParticularPost {...propsWithoutUsername} />);

        expect(screen.getByText("Anonymous")).toBeInTheDocument();
    });

    it("renders the caption or fallback if no caption is provided", () => {
        const propsWithoutCaption = { ...defaultProps, caption: "" };
        render(<ParticularPost {...propsWithoutCaption} />);

        expect(screen.getByText("No caption provided.")).toBeInTheDocument();
    });

    it("renders the image if fileUrl is provided", () => {
        render(<ParticularPost {...defaultProps} />);

        expect(screen.getByAltText("Post Media")).toBeInTheDocument();
    });

    it("renders fallback text if no media is attached", () => {
        const propsWithoutFileUrl = { ...defaultProps, fileUrl: "" };
        render(<ParticularPost {...propsWithoutFileUrl} />);

        expect(screen.getByText("No media attached.")).toBeInTheDocument();
    });

});
