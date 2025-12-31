const Footer = () => {
    return (
        <footer className="border-t border-gray-200 py-8 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    {/* Left section */}
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-800">Job Hunt</h2>
                        <p className="text-sm text-gray-500">
                            © 2024 Job Hunt. All rights reserved.
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="flex space-x-4">
                        {/* Facebook */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            aria-label="Facebook"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.49v-9.294H9.691V11.01h3.123V8.309c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
                            </svg>
                        </a>

                        {/* Twitter */}
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            aria-label="Twitter"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.92 4.92 0 001.523 6.573 4.903 4.903 0 01-2.229-.616v.06a4.92 4.92 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.92 4.92 0 004.6 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.213-.005-.426-.014-.637A10.012 10.012 0 0024 4.557z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            aria-label="LinkedIn"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.447 20.452H16.85v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.264V9h3.457v1.561h.05c.482-.913 1.66-1.874 3.415-1.874 3.652 0 4.329 2.404 4.329 5.531v6.234zM5.337 7.433a2.006 2.006 0 110-4.012 2.006 2.006 0 010 4.012zM6.98 20.452H3.695V9H6.98v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
                            </svg>
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
