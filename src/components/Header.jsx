import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
  redirect,
  useLocation,
  Outlet,
} from "react-router-dom";
import { logout } from "../slices/authSlice";
import { toast, Toaster } from "react-hot-toast";
import { HiShoppingBag } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { setSearchKeyword } from "../slices/searchSlice";
import {
  Image,
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import { MdRestaurantMenu, MdOutlineInventory } from "react-icons/md";
import { BASE_URL } from "../helper";

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    // You can return a loading message or something else while userInfo is being checked
    return <div>Loading...</div>;
  }

  return (
    <Box className="z-50" minH="100vh" bg={useColorModeValue("#fff", "#fff")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isVendor = userInfo.role === "vendor";

  const linkItems = isVendor
    ? [
        { name: "Dashboard", icon: FiHome, href: "/dashboard" },
        { name: "Inventory", icon: MdOutlineInventory, href: "/inventory" },
        { name: "Active Order", icon: FiCompass, href: "/active-orders" },
        { name: "Previous Order", icon: FiStar, href: "/previous-orders" },
        { name: "Settings", icon: FiSettings, href: "/profile" },
      ]
    : [
        { name: "Home", icon: FiHome, href: "/" },
        { name: "Active Order", icon: FiCompass, href: "/user/active-orders" },
        { name: "Previous Order", icon: FiStar, href: "/user/previous-orders" },
        { name: "User", icon: FiSettings, href: "/profile" },
      ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image h={10} src="/logo.png" />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <div className="nav-link" onClick={onClose}>
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        </div>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link to={href}>
      <Box
        as="a"
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#ff742e",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const vendorId = useSelector((state) => state.vendor.vendorId);

  const [loading, setLoading] = useState();
  console.log(vendorId);

  const userImg = userInfo.avatar.url;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signoutHandler = async () => {
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/api/v1/logout`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/auth/login");
      setLoading(false);
      return null;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const location = useLocation();
  const path = location.pathname;

  const pathmenu1 = path.search("/menu");
  const pathmenu2 = path.search("/inventory");
  console.log(pathmenu1, pathmenu2);

  var flag = true;
  if (pathmenu1 !== -1 || pathmenu2 !== -1) {
    flag = false;
  }

  console.log(flag);

  const searchHandler = (e) => {
    console.log(e.target.value);
    dispatch(setSearchKeyword(e.target.value));
  };

  return (
    <div className="fixed w-screen z-10">
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        {flag ? (
          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            <Image h={10} src="/logo.png" />
          </Text>
        ) : (
          <div className="relative flex  mr-2 sm:mr-6 my-2">
            <input
              type="text"
              className="bg-purple-white shadow-lg rounded border-0 p-2"
              placeholder="Search by name..."
              onChange={(e) => {
                searchHandler(e);
              }}
            />
            <div className=" pin-r pin-t mt-[13px] ml-[-25px] text-purple-lighter">
              <BiSearch />
            </div>
          </div>
        )}

        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} src={userImg} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm" className="capitalize">
                      {userInfo.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {userInfo.role}
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Link to="/profile">
                  <MenuItem>Settings</MenuItem>
                </Link>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem onClick={signoutHandler}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {cartItems.length > 0 && (
            <Link to={`/vendor/${vendorId}/cart`}>
              <div className="cart-button bg-[#ff742e] rounded-full ml-1 pt-[5px] w-10 h-10 justify-item-center justify-center">
                <HiShoppingBag size={24} color="white" className="m-auto" />
                <p className="text-[9px] w-3 rounded-full text-center bg-white mt-[-8px] ml-auto mr-auto">
                  {cartItems.length}
                </p>
              </div>
            </Link>
          )}
        </HStack>
      </Flex>
    </div>
  );
};

export default SidebarWithHeader;
